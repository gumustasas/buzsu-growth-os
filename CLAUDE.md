# CLAUDE.md — Buzsu Growth OS Claude Code Çalışma Kuralları

Bu dosya, buzsu-growth-os reposunda Claude Code'un nasıl davranması gerektiğini tanımlar.
Bu kurallar tüm varsayılan davranışların önünde gelir.

---

## Temel Prensipler

1. **Canlı siteye otomatik yayın yasaktır.** Buzsu.com.tr veya Suvesu.com'a Claude Code aracılığıyla hiçbir değişiklik doğrudan yayınlanmaz.
2. **Tüm çıktılar önce `/drafts` içine yazılır.** Onay gelmeden `/outputs` dizinine taşınmaz.
3. **Kod değişikliği = branch + PR önerisi.** Doğrudan main'e kod yazmak yasaktır.
4. **SEO içerik değişikliği = SERP + Search Console + Serper kontrolü sonrası öneri.** Kör öneri yapılmaz.
5. **Ürün, fiyat, sağlık iddiası abartılmaz.** Doğrulanabilir bilgi yaz; bağımsız teyit edilemeyen iddialar yazılmaz.
6. **Görev sonu raporu üret.** Her oturum JSON özeti ile kapanır.
7. **Her agent kendi alanı dışında karar vermez.** Gerekirse ilgili agenta görev üretir.
8. **Her işlem loglanır.** Gerçekleştirilen her eylem commit geçmişi veya task kaydı ile izlenebilir olur.

---

## Repo Kuralları

### Yapmaması Gerekenler

- Buzsu.com.tr veya Suvesu.com'a doğrudan içerik yayınlamak.
- İnsan onayı olmadan `git push` yapmak (yalnızca feature branch'e, onaylı commit'ler hariç).
- Yeni npm/pip bağımlılığı eklemek.
- `.env`, kimlik bilgisi veya API anahtarı içeren dosya oluşturmak/değiştirmek.
- Ürün fiyatı, garanti süresi veya teknik spesifikasyon uydurmak.
- AI Commerce katmanında kullanıcı adına ödeme veya kesin sipariş tamamlamak.
- Airtable, n8n veya Vercel'e insan onayı olmadan production yazma yapmak.

### Yapabilecekler

- `/drafts` altında içerik, kod ve şema taslağı oluşturmak.
- `/tasks` altında görev dosyası oluşturmak ve güncellemek.
- `/agents` altında agent tanım dosyalarını güncellemek.
- `/docs` ve kök düzey dokümantasyonu güncellemek.
- Git commit ve branch işlemleri yapmak (belirtilen dal üzerinde).
- Airtable'dan okuma yapmak (yazma değil).
- Serper ile SERP araştırması yapmak (öneri üretmek için).
- Mevcut yapılandırma dosyalarını SAFE PATCH kapsamında güncellemek.

---

## Değişiklik Sınıflandırması

> Bu tablo buzsu-growth-os'ta değişiklik sınıflandırmasının **tek kaynağıdır**.
> Diğer belgeler bu bölüme referans verir, tekrarlamaz.

| Değişiklik Türü | Sınıf | Onay Gerekli mi? |
|---|---|---|
| Yazım / format düzeltmesi | SAFE PATCH | Hayır |
| Yeni dokümantasyon dosyası | SAFE PATCH | Hayır |
| `/drafts` içine yeni taslak ekleme | SAFE PATCH | Hayır |
| Mevcut agent davranışını güncelleme | MINOR | Evet |
| Yeni agent ekleme | MINOR | Evet |
| `/outputs` içine taşıma (onay alındıktan sonra) | MINOR | Evet |
| Canlı siteye içerik / kod değişikliği (PR yoluyla) | MAJOR | Evet |
| Dış sistem yazma bağlantısı (n8n, Airtable, Vercel) | MAJOR | Evet |
| Mimari karar | MAJOR | Evet |
| Yeni bağımlılık / servis ekleme | MAJOR | Evet |
| Ürün fiyatı veya teknik spec değişikliği | MAJOR | Evet |

---

## Commit Kuralları

- Format: `<tip>: <özet>` — Türkçe veya İngilizce.
- Tipler: `docs`, `fix`, `chore`, `feat`, `agent`, `task`, `output`
- `feat`: yalnızca onaylı, tamamlanmış özellik için.
- `task`: `/tasks` altına yeni görev eklendiğinde.
- `output`: `/outputs` altına onaylı çıktı taşındığında.
- Commit mesajına model adı, oturum kimliği veya iç araç referansı eklenmez.

Örnekler:
```
docs: seo-agent sorumluluklarını güncelle
task: featured snippet audit görevi oluştur (tasks/seo/)
output: Nisan SERP raporu onaylandı, outputs/reports/ taşındı
agent: commerce-agent WhatsApp handoff kuralı eklendi
```

---

## Dal Yönetimi

- Aktif geliştirme dalı: `claude/focused-franklin-njbm76`
- `main` dalına doğrudan push yapılmaz.
- Kod değişiklikleri için yeni feature branch açılır; PR yoluyla birleştirilir.
- PR açmak için açık kullanıcı talebi gerekir.

---

## SEO / İçerik Kısıtlamaları

Bu kurallar [docs/human-approval.md](docs/human-approval.md) ile birlikte okunmalıdır.

- Her SEO önerisi SERP sonuçları, Search Console verisi ve Serper snapshot'ına dayandırılır.
- Hedef URL'nin mevcut sıralaması bilinmeden pozisyon tahmini yapılmaz.
- E-E-A-T sinyalleri (firma bilgisi, garanti, servis, iletişim) abartılmadan yansıtılır.
- Schema.org markalamada yanlış ürün özellikleri yazılmaz.

---

## AI Commerce Sınırları

- Claude Code, kullanıcı adına ödeme veya sipariş tamamlayamaz.
- Sepet hazırlığı, ürün karşılaştırması ve WhatsApp lead aktarımı serbesttir.
- Agentic etkileşimde kullanıcı her adımda bilgilendirilir ve onayı alınır.
- Detay: [docs/ai-commerce-layer.md](docs/ai-commerce-layer.md)

---

## Güvenlik Kuralları

- API anahtarı, token, şifre hiçbir dosyaya yazılmaz; env var veya secret manager kullanılır.
- `secrets`, `credentials`, `token`, `password` içeren dosya oluşturulmaz.
- Kullanıcı PII içeren taslak raporlar repoya commit edilmeden önce anonimleştirilmelidir.
- Airtable kayıtlarındaki müşteri telefon/isim bilgisi `outputs/` veya `drafts/` dosyalarına yazılmaz.

---

## Görev Sonu Raporu — Oturum Düzeyi

Her görev oturumunun sonunda aşağıdaki formatta kısa bir rapor üret:

```json
{
  "status": "success | partial | failed",
  "repo": "gumustasas/buzsu-growth-os",
  "branch": "<aktif_dal>",
  "changed_files": ["<dosya_1>", "<dosya_2>"],
  "summary": "<tek_cümlelik_özet>",
  "agents_involved": ["<agent_1>", "<agent_2>"],
  "open_items": ["<bekleyen_madde_1>"]
}
```

Rapor konuşmanın sonunda metin olarak sunulur. Dış sisteme gönderilmez.

---

## Kapsam Belirsizliği

Görev tanımı belirsizse veya sınıf net değilse:
- Varsayılan olarak daha kısıtlı sınıfı (MINOR veya MAJOR) seç.
- Kullanıcıya kısa bir açıklama ile sor; onay gelmeden uygulama.
- Özellikle canlı site etkisi belirsiz olan tüm işlemlerde dur ve sor.
