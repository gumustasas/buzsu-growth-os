# İnsan Onayı Sistemi

## Temel Kural

> **Hiçbir agent, insan onayı olmadan herhangi bir dış sisteme yazma işlemi yapamaz.**

Bu kural istisnasızdır. Tek istisna: agent'ın kendi `/tasks/`, `/drafts/` dizinlerine yaptığı yerel yazma işlemleri.

---

## Onay Kapısı: Nerede?

```
Agent çıktı üretir
       ↓
  /drafts/<alan>/
       ↓
  [İNSAN İNCELER]
       ↓
  Onay verir mi?
  ├── Evet → /outputs/<alan>/ veya dış sisteme uygulama
  └── Hayır → /drafts/ altında düzeltme notu bırakır; agent yeniden çalışır
```

---

## Değişiklik Sınıflandırması

### SAFE PATCH — Onaysız uygulanabilir

Şu koşulları karşılıyorsa:
- Yalnızca bu repo içinde (/tasks, /drafts, /outputs, /docs, /agents)
- Dış sisteme yazma yok
- Geri alınabilir (git revert)
- Yayın veya kullanıcı etkisi yok

**Örnekler:**
- `/drafts/` veya `/tasks/` altına yeni dosya yazmak
- Agent definition dosyası güncellemek
- `ROADMAP.md` veya `MIGRATION_REPORT.md` güncellemek
- Test dosyası eklemek

---

### MINOR — İnsan onayı gerekli

Şu koşullardan herhangi biri varsa:
- `suvesu-site` veya `buzsu` reposuna kod değişikliği
- Airtable'a yeni kayıt veya alan yazımı
- SEO içeriğini yayınlamak (CMS'e push)
- Schema markup'ı siteye eklemek
- n8n workflow'u production'a yüklemek
- WhatsApp CTA URL değişikliği

**Süreç:**
1. Agent taslağı `/drafts/code/<özellik>.md` altına yazar (branch + PR taslağı dahil).
2. İnsan taslağı okur ve değişikliği doğrular.
3. İnsan branch oluşturur, değişikliği uygular, PR açar.
4. PR onaylanırsa merge edilir.

---

### MAJOR — İnsan onayı + yapısal değerlendirme gerekli

Şu koşullardan biri varsa:
- Site mimarisi veya URL yapısı değişikliği
- Yeni Airtable tablosu veya base oluşturma
- Agent sistemi veya orkestrasyon kuralı değişikliği
- Production veritabanı veya CRM şeması değişikliği
- Yeni dış servis entegrasyonu (yeni API, yeni platform)
- Toplu içerik silme veya URL yönlendirme

**Süreç:**
1. Agent önce `/drafts/` altına etki analizi yazar.
2. İnsan etki analizini okur, onaylar veya revizyon ister.
3. Uygulama için ayrı görev başlatılır.
4. Geri alma planı da yazılır.

---

## Onay Olmadan Yapılabilecekler (SAFE PATCH Listesi)

| İşlem | Neden güvenli |
|-------|--------------|
| `/tasks/` altına görev dosyası yazmak | Yalnızca bu repo |
| `/drafts/` altına taslak yazmak | İnsan onayı sonrası uygulanır |
| `/agents/` altında agent definition güncellemek | Bu repo, geri alınabilir |
| `/docs/` altına belge yazmak | Bu repo, geri alınabilir |
| Görev sonu JSON raporu eklemek | Bu repo, log amaçlı |
| Test dosyası çalıştırmak (yerel) | Dış etkisi yok |

---

## Onay Olmadan Yapılamayacaklar (Kesin Yasak)

| İşlem | Neden yasak |
|-------|------------|
| `suvesu-site` veya `buzsu` reposuna push | Canlı site etkisi |
| Airtable'a kayıt yazmak (lead, kampanya, ürün) | CRM veri bütünlüğü |
| n8n'e workflow yüklemek | Production otomasyon riski |
| Vercel'e deployment tetiklemek | Canlı site etkisi |
| WhatsApp mesajı göndermek | Kullanıcı iletişimi |
| Google Analytics veya Search Console'a veri yazmak | Analytics kirliği |
| SSL sertifikası veya DNS değişikliği | Site erişilebilirlik riski |

---

## Agent Onay Talebi Formatı

Agent, insan onayı gerektiren bir adımla karşılaştığında şunu yazar:

```markdown
## ⚠️ ONAY GEREKLİ — MINOR DEĞİŞİKLİK

**Değişiklik:** `public_html/api/chat.js` — logLead() fonksiyonu güncelleme
**Etki:** Suvesu.com AI agent lead'lerinin Airtable'a doğru yazılması
**Risk:** Mevcut leads etkilenmez; yeni leads'e uygulanır
**Geri alma:** git revert ile saniyeler içinde geri alınabilir
**Test:** chat.test.js — 31 test geçiyor
**Dosya:** `drafts/code/fix-ai-agent-airtable-field-mapping.md`

Onaylamak için: `drafts/code/fix-ai-agent-airtable-field-mapping.md` dosyasını okuyun ve uygulamayı başlatın.
```

---

## Onay Kaydı

Onaylanan değişiklikler için `/tasks/<alan>/<görev-id>.md` dosyasına şu not eklenir:

```
## Onay Kaydı
- Tarih: YYYY-MM-DD
- Onaylayan: [isim veya "kullanıcı"]
- Uygulanan: evet / hayır
- PR/Commit: [link veya ID]
```
