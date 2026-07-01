# Dış Repo Entegrasyon Raporu

Oluşturulma: 2026-06-30  
Şube: `claude/buzsu-external-repo-integration-tuc18c`  
Durum: SAFE PATCH (taslak; canlı siteye uygulanmadan önce insan incelemesi gerekli)

---

## 1. İncelenen Repolar ve Lisans Bilgileri

> Lisans bilgileri repo kök dizinindeki LICENSE dosyasından alındı.
> "Bulunamadı" ifadesi: LICENSE dosyası mevcut değil veya farklı konumda;
> bu durumda "tüm haklar saklı" varsayılan geçerlidir — kullanım öncesi repo sayfası kontrol edilmeli.

| # | Repo | İnceleme Yöntemi | Lisans | Durum |
|---|------|------------------|--------|-------|
| 1 | `anthropics/skills` | README (main) | **Bulunamadı** | Kısmen kullanıldı |
| 2 | `ComposioHQ/awesome-claude-skills` | README (master) | **Bulunamadı** | Kısmen kullanıldı |
| 3 | `daymade/claude-code-skills` | README (main) | MIT | Kullanıldı |
| 4 | `alirezarezvani/claude-skills` | README (main) | MIT | Kullanıldı |
| 5 | `addyosmani/agent-skills` | README (main) | MIT | Kullanıldı |
| 6 | `czlonkowski/n8n-mcp` | README (main) | MIT | Kullanıldı |
| 7 | `continuedev/continue` | README (main) | Apache 2.0 | Sadece referans |
| 8 | `openai/codex-plugin-cc` | README (main) | Doğrulanamadı | Sadece referans |
| 9 | `hesreallyhim/awesome-claude-code` | README (main) | **CC BY-NC-ND 4.0** | Kullanılmadı ⚠️ |
| 10 | `Cranot/claude-code-guide` | README (main) | Bulunamadı | Kısmen kullanıldı |
| 11 | `luongnv89/claude-howto` | README (main) | MIT | Sadece referans |
| 12 | `ykdojo/claude-code-tips` | README (main) | Özel/Standart dışı ⚠️ | Kısmen kullanıldı (yalnızca genel pratik fikri) |
| 13 | `zubair-trabzada/geo-seo-claude` | README (main) | MIT | Kullanıldı |
| 14 | `AndreasH96/seo-geo-consultant` | README (main) | MIT | Kullanıldı |
| 15 | `vishalmdi/goog-geo` | README (main) | Bulunamadı | Kısmen kullanıldı |
| 16 | `nextlevelbuilder/ui-ux-pro-max-skill` | README (main) | MIT | Kullanıldı |
| 17 | `mukul975/Anthropic-Cybersecurity-Skills` | README (main) | Apache 2.0 | Kullanıldı |
| 18 | `thedotmack/claude-mem` | README (main) | Apache 2.0 | Kullanıldı |
| 19 | `obra/superpowers` | README (main) | MIT | Kısmen kullanıldı |

### Lisans Uyarıları

- **`hesreallyhim/awesome-claude-code` (CC BY-NC-ND 4.0)**: NonCommercial + NoDerivatives lisansı.
  BUZSU ticari bir işletme olduğundan bu repodaki içerik **kullanılmadı**. Repo içeriği
  incelendiğinde büyük bölümü "Coming soon" yer tutucusu olarak bulundu; bu da zaten
  bağımsız bir neden. Gelecekte aktif hale gelse de ticari kullanıma izin veren lisansa
  geçip geçmediği kontrol edilmeden içerik alınmamalıdır.

- **`ykdojo/claude-code-tips` (özel/standart dışı)**: LICENSE dosyası standart açık kaynak
  lisansına uymayan, yalnızca repo sahibine geniş haklar tanıyan bir metin içeriyor. Bu nedenle
  bu repodan yalnızca **genel pratik fikirleri** (ör. "push'u manuel onayla yap") referans
  alındı; herhangi bir metin, prompt veya kod kopyalanmadı.

- **`anthropics/skills`, `ComposioHQ/awesome-claude-skills`, `vishalmdi/goog-geo`,
  `Cranot/claude-code-guide`**: LICENSE dosyası bulunamadı. Bu repolardan alınan kısımlar
  yalnızca genel tasarım desenleri/pratikleri (ör. "YAML frontmatter formatı",
  "5 kategorili skorlama modeli") düzeyindedir; telif hakkıyla korunan metin veya kod
  kopyalanmadı. Buna rağmen, bu repolardan ileride daha fazla içerik alınacaksa lisans
  durumu doğrulanmalıdır.

---

## 2. Hangilerinden Ne Alındı

> "Alındı" = BUZSU bağlamına uyarlanarak yeniden yazıldı; birebir kopyalama yapılmadı.

### anthropics/skills
- **Alınan**: `skill.md` dosyasının YAML frontmatter yapısı (`name` + `description` zorunlu alanları).
- **Yerleştirme**: `templates/SKILL_TEMPLATE.md`, tüm 19 `skills/*/skill.md` dosyaları.
- **Alınmayan**: Herhangi bir spesifik skill içeriği; bu repo genel format standartlarını sağladı.

### ComposioHQ/awesome-claude-skills
- **Alınan**: "Araç bütünleştirmesi" ve "otomasyon" odaklı skill paketleme fikri.
- **Yerleştirme**: `skills/mcp/`, `skills/n8n/` modüllerinin "Ne Zaman Devreye Girer" bölümleri.
- **Alınmayan**: Herhangi bir spesifik araç kodu veya metin; katalog yapısı referans alındı.

### daymade/claude-code-skills
- **Alınan**: Bağımsız `github-ops` skill örneği — PR/issue otomasyonunun ayrı bir skill modülü
  olarak paketlenmesi pratiği.
- **Yerleştirme**: `skills/github/skill.md`.

### alirezarezvani/claude-skills
- **Alınan**: "Sınır" bölümü pratiği — her skill dosyasında açık bir kapsam sınırı tanımlanması.
- **Yerleştirme**: Tüm 19 `skills/*/skill.md` dosyasının "Sınır" bölümü; `templates/SKILL_TEMPLATE.md`.

### addyosmani/agent-skills
- **Alınan**: Agent skill'lerinin spesifik sorumluluk listesiyle tanımlanması (task-based vs.
  proactive trigger ayrımı).
- **Yerleştirme**: `skills/seo/skill.md`, `skills/cro/skill.md`, `skills/content/skill.md`.

### czlonkowski/n8n-mcp
- **Alınan**: 7 adımlı dokümantasyon-önce workflow süreci (get_sdk_reference →
  get_workflow_best_practices → search_nodes → get_node_types → validate_node_config →
  validate_workflow → publish); "NEVER edit production workflows directly with AI" kritik uyarısı.
- **Yerleştirme**: `skills/n8n/skill.md`, `skills/n8n/implementation.md`,
  `knowledge/n8n-workflow-process.md`, `playbooks/n8n-otomasyon-kurulum.md`.

### Cranot/claude-code-guide
- **Alınan**: Hooks ile commit mesajı/format zorunluluğu fikri; sub-agent paralel görev pratiği
  (sadece genel fikir, metin kopyalanmadı; lisans doğrulanamadı).
- **Yerleştirme**: `skills/github/README.md` kaynak atfı.

### ykdojo/claude-code-tips
- **Alınan**: Push işlemlerinin manuel onay gerektirdiği prensibi; git worktree ile paralel
  geliştirme fikri (yalnızca genel pratik fikri; metin/kod kopyalanmadı; özel lisans nedeniyle
  kapsamı kısıtlı tutuldu).
- **Yerleştirme**: `skills/github/README.md` kaynak atfı.

### zubair-trabzada/geo-seo-claude (MIT)
- **Alınan**: 6 kategorili ağırlıklı GEO skorlama modeli (citability %25, marka otoritesi %20,
  içerik kalitesi %20, teknik temel %15, structured data %10, platform optimizasyonu %10);
  134-167 kelimelik öz-yeten bilgi bloğu kuralı; marka bahsinin backlink'ten 3x güçlü AI
  görünürlük korelasyonu; 14+ AI crawler erişim denetimi; llms.txt standardı;
  e-ticaret şema şablonu referansı.
- **Yerleştirme**: `skills/geo/`, `skills/entity-seo/`, `skills/schema/`, `skills/aeo-ai-search/`,
  `knowledge/geo-scoring-frameworks.md`.

### AndreasH96/seo-geo-consultant (MIT)
- **Alınan**: 80+ maddelik teknik/on-page/off-site denetim listesi yapısı; 120-180 kelime
  kuralı (AI pasaj uzunluğu); "3 aylık alıntı uçurumu" bulgusu; AI bot robots.txt yönetimi
  (GPTBot, ClaudeBot, PerplexityBot); JSON-LD şablon seti; 4 modlu çalışma yapısı.
- **Yerleştirme**: `skills/seo/`, `skills/geo/`, `skills/aeo-ai-search/`, `skills/schema/`.

### vishalmdi/goog-geo (lisans bulunamadı)
- **Alınan**: 100 puanlık 5 kategorili skorlama modeli yapısı; 3 zorunlu uygunluk kapısı
  (Googlebot erişimi, noindex yok, nosnippet yok); Princeton GEO araştırması (KDD 2024)
  referansı — kaynak gösterme +%40, istatistik +%37 alıntı artışı.
- **Yerleştirme**: `skills/geo/checklist.md`, `skills/aeo-ai-search/checklist.md`,
  `knowledge/geo-scoring-frameworks.md`.
- **Not**: Lisans doğrulanamadı; yalnızca genel bulgular ve araştırma atıfları alındı,
  repo metninin kendisi kopyalanmadı.

### nextlevelbuilder/ui-ux-pro-max-skill (MIT)
- **Alınan**: Accessibility-first tasarım kontrol listesi; mobil-önce düzen prensipleri;
  form kullanılabilirliği ve CTA hiyerarşisi değerlendirme yapısı.
- **Yerleştirme**: `skills/ui-ux/checklist.md`, `skills/ui-ux/skill.md`.

### mukul975/Anthropic-Cybersecurity-Skills (Apache 2.0)
- **Alınan**: Güvenlik alanı taksonomisi (girdi doğrulama, secret yönetimi, API güvenliği,
  PII/veri minimizasyonu, bağımlılık denetimi kategorileri); kurumsal/red-team kısımları
  BUZSU'ya uygunsuz olduğu için alınmadı.
- **Yerleştirme**: `skills/security/skill.md`, `skills/security/checklist.md`,
  `knowledge/security-domains-map.md`.

### thedotmack/claude-mem (Apache 2.0)
- **Alınan**: Oturumlar arası bağlam kaybını önlemek için dosya-tabanlı yapılandırılmış özet
  deseni. MCP server bileşeni alınmadı (yeni bağımlılık/servis = MAJOR).
- **Yerleştirme**: `skills/memory/skill.md`, `knowledge/memory-architecture-patterns.md`.

### obra/superpowers (MIT)
- **Alınan**: "Superpower" kavramı — Claude Code'un çok adımlı görevlerde paralel agent
  koordinasyonu; BUZSU'daki orchestrator → agent routing mantığı ile karşılaştırma.
- **Yerleştirme**: `skills/mcp/skill.md` referans.

---

## 3. Hangi Klasöre Yerleştirildi

| İçerik Kategorisi | Hedef Dizin |
|---|---|
| 19 skill modülü (5'er dosya, 95 dosya toplam) | `skills/<alan>/` |
| Skill yazma şablonları (6 dosya) | `templates/` |
| Çapraz alan araştırma notları (6 dosya) | `knowledge/` |
| Uçtan uca senaryo rehberleri (6 dosya) | `playbooks/` |
| Connector akış dokümantasyonu (3 dosya) | `workflows/{n8n,airtable,serper}/` |
| Bu rapor | `reports/` |

**Toplam yeni dosya**: 118

---

## 4. Sadece Referans Bırakılan Repolar

| Repo | Neden Referans Kaldı |
|---|---|
| `continuedev/continue` (Apache 2.0) | Genel amaçlı IDE eklentisi; BUZSU'nun Claude Code + n8n + Airtable yığınıyla doğrudan örtüşen skill içeriği yok. |
| `openai/codex-plugin-cc` | Claude Code plugin değil, farklı bir platform için plugin. Lisans doğrulanamadı. |
| `hesreallyhim/awesome-claude-code` | CC BY-NC-ND 4.0 lisansı ticari kullanımı yasaklıyor. İçerik büyük ölçüde "Coming soon" yer tutucusu. |
| `luongnv89/claude-howto` | MIT lisanslı; içerik genel Claude Code nasıl-kullanılır rehberi. BUZSU'ya özgü skill ekleyecek spesifik desen bulunamadı. Gelecekte "memory" veya "github" modülüne eklenebilir. |

---

## 5. BUZSU SEO/GEO/CRO Öncelik Sırası

Araştırma bulgularına ve BUZSU'nun mevcut durumuna (Suvesu→Buzsu iki site stratejisi,
WhatsApp satış kanalı, Airtable CRM, küçük ölçekli e-ticaret) göre öncelik sırası:

### P1 — Hemen Uygulanabilir (mevcut içerik + altyapıyla)

1. **GEO** (`skills/geo/`) — Suvesu.com'un bilgi içerikleri AI Overview için zaten doğru
   formatta; 134-167 kelime + kaynak atfı kuralı uygulanarak hızlı kazanım sağlanabilir.
2. **Schema** (`skills/schema/`) — Product + FAQ JSON-LD eksikse veya hatalıysa düzeltmek
   düşük çaba, yüksek etki (hem SEO hem GEO skorlamasına katkı).
3. **SEO — Kolay Kazanımlar** (`skills/seo/`) — Mevcut SERP verisiyle (Search Console)
   Title/meta description uzunlukları, canonical tutarlılığı gibi teknik düzeltmeler.

### P2 — Orta Vadeli (1-3 ay)

4. **Entity SEO** (`skills/entity-seo/`) — Mevcut `knowledge-graph/` altyapısı var; entity
   tutarlılığını arama motorlarına daha güçlü sinyallemek için çalışma gerekli.
5. **AEO/AI Search** (`skills/aeo-ai-search/`) — Sesli asistan ve ChatGPT tarzı doğrudan
   cevap optimizasyonu; geo-agent kapsamında yürütülmesi tavsiye edildi.
6. **CRO** (`skills/cro/`) — WhatsApp CTA optimizasyonu ve güven sinyalleri; e-ticaret
   `skills/ecommerce/` ile birlikte, özellikle `playbooks/whatsapp-satis-optimizasyonu.md`.

### P3 — Teknik Altyapı (ihtiyaç ortaya çıktıkça)

7. **n8n Otomasyon** (`skills/n8n/`) — Lead yakalama/skorlama otomasyonu, `architecture.md`'deki
   "CAPTURE → QUALIFY → CONVERT" akışının n8n'de hayata geçirilmesi.
8. **Security** (`skills/security/`) — Aylık denetim; `playbooks/guvenlik-denetimi.md`.
9. **Content, UI/UX, Images, Video** — Büyüme ivmesi arttıkça içerik üretim kapasitesini
   desteklemek için devreye girer.
10. **Memory, MCP, GitHub, Vercel, PHP, CodeIgniter3.7.1** — Platform kararlıyken optimizasyon için;
    sistem kırılganlığı tespit edilirse öne alınabilir.

---

## 6. Sonraki Yapılacaklar

### Kısa Vadeli (bu oturumdan sonra, insan onayıyla)

- [ ] **P1 skill'lerini aktif kullanıma alın**: Suvesu.com'un mevcut bir bilgi sayfasında
  `skills/geo/checklist.md` üzerinden denetim yapın; bulguları `tasks/geo/` altında kaydedin.
- [ ] **Schema denetimi**: Buzsu.com.tr ürün sayfalarından birinde mevcut JSON-LD çıktısını
  `skills/schema/checklist.md` ile karşılaştırın.
- [ ] `agents/geo-agent.md`'ye `skills/geo/` referansı ekleyin (MINOR — mevcut agent
  davranışını güncelleme; onay gerekli).

### Orta Vadeli

- [ ] **Yeni agent değerlendirmesi** (MINOR, onay gerekli):
  - `aeo-agent` — AEO/AI Search için (`skills/aeo-ai-search/` var, agent yok).
  - `platform-agent` — CI3.7.1/PHP/Vercel kod denetimi için.
  - `security-agent` — Aylık güvenlik taraması için.
  - `ui-ux-agent` — UI/UX değerlendirme için.
  - `memory-agent` — Oturumlar arası bağlam yönetimi için.
- [ ] `hesreallyhim/awesome-claude-code` reposunu izleyin: ticari kullanıma izin veren
  lisansa geçerse içerik değerlendirilebilir.
- [ ] `anthropics/skills`, `ComposioHQ/awesome-claude-skills`, `vishalmdi/goog-geo`,
  `Cranot/claude-code-guide` repolarının lisans durumlarını doğrulayın; lisans belirginleşirse
  içerik genişletilebilir.

### Uzun Vadeli

- [ ] n8n Playbook'u (`playbooks/n8n-otomasyon-kurulum.md`) gerçek bir lead-capture
  otomasyonu için insan denetiminde hayata geçirin (MAJOR — dış sistem yazma bağlantısı).
- [ ] Bu raporu insan onayından sonra `outputs/reports/` altına taşıyın.

---

*Bu rapor `drafts/` konumuna değil doğrudan `reports/` altına yazıldı çünkü doğrudan çıktı
üretmez; sadece mevcut entegrasyonu belgeler ve insan kararına girdi sağlar. Canlı siteye
etkisi yoktur.*

---

## Second Integration Wave

**Tarih**: 2026-06-30
**Şube**: `claude/buzsu-external-repo-integration-tuc18c`

### İncelenen Repolar

| # | Repo | Analiz Yöntemi | Lisans | Kullanım Durumu |
|---|------|----------------|--------|----------------|
| 1 | `vercel-labs/skills` | README (main) | **Bulunamadı** | Kısmen kullanıldı |
| 2 | `multica-ai/andrej-karpathy-skills` | README (main) | **Bulunamadı** | Kullanıldı |
| 3 | `browser-use/video-use` | README (main) | MIT | Kullanıldı |
| 4 | `harry0703/MoneyPrinterTurbo` | README (main) | MIT | Kullanıldı |

### Repo Bazlı Analiz

#### vercel-labs/skills (lisans bulunamadı)

- **Analiz edildi**: YAML frontmatter tabanlı skill tanım standardı (name + description
  zorunlu alanlar); 70+ platform desteği; symlink vs. copy kurulum stratejileri;
  CI/CD non-interactive modları; proje-kapsamlı vs. global deployment farkı.
- **Oluşturulan dosyalar**: `skills/frontend/` (5 dosya), `skills/planning/` (kısmen).
- **Geliştirilen skill**: Var olan format standardı Wave 1'den türetilmişti; bu repo
  Vercel deployment pratiklerini `skills/frontend/`, `skills/performance/`,
  `knowledge/frontend-best-practices.md`'ye somutlaştırdı.
- **Alınmayanlar**: Kurulum CLI kodu; platform katalog listesi (70+ agent adı);
  symlink implementasyonu — bunlar BUZSU'nun dosya tabanlı skill yaklaşımıyla uyumsuz.
- **Lisans değerlendirmesi**: LICENSE dosyası bulunamadı. Yalnızca genel tasarım
  desenleri (YAML frontmatter, deployment aşama sırası) uyarlandı; repo metninin
  kendisi kopyalanmadı. İçerik genişletilecekse lisans durumu doğrulanmalı.
- **BUZSU kullanım amacı**: Next.js + Vercel stack kullanıyoruz; deployment
  pratikleri ve skill format standardı doğrudan uygulanabilir.

#### multica-ai/andrej-karpathy-skills (lisans bulunamadı)

- **Analiz edildi**: 4 temel prensip (kod yazmadan varsayım açma, basitlik önceliği,
  cerrahi değişiklik, doğrulanabilir hedef); multi-step decomposition; test-first
  debugging; anti-overengineering.
- **Oluşturulan dosyalar**: `skills/coding/` (5 dosya), `skills/debugging/` (5 dosya),
  `skills/refactoring/` (5 dosya), `skills/planning/` (5 dosya).
- **Geliştirilen skill**: Bu 4 modül Wave 1'de yoktu; tamamen yeni.
- **Alınmayanlar**: Herhangi bir metin/kod/prompt birebir kopyalanmadı. Repo metninden
  yalnızca kavramsal çerçeve (4 prensip) uyarlandı; BUZSU bağlamına (CI3.7.1, Next.js,
  Airtable) tamamen yeniden yazıldı.
- **Lisans değerlendirmesi**: LICENSE dosyası bulunamadı. Kavramsal çerçeve
  (fikir/prensip) telif hakkıyla korunmaz; bunun ötesinde hiçbir ifade kopyalanmadı.
  İçerik genişletilecekse lisans doğrulanmalı.
- **BUZSU kullanım amacı**: BUZSU'nun en büyük riski belirsiz görevlerde yanlış
  varsayımla ilerlemek. Karpathy çerçevesi bunu önleyen en pratik seti sunuyor;
  CLAUDE.md'nin "kör öneri yapılmaz" kuralıyla birebir örtüşüyor.

#### browser-use/video-use (MIT)

- **Analiz edildi**: Metin-önce video düzenleme mimarisi; transkripsiyon → 12KB
  markdown paketi → LLM akıl yürütme → EDL → render → 3x otomatik yeniden render;
  ses birincil düzenleme sinyali; 12 production kuralı; HyperFrames/Remotion paralel
  alt-agent animasyon.
- **Oluşturulan dosyalar**: `skills/video-automation/` (5 dosya),
  `knowledge/video-workflows.md`, `playbooks/video-automation-playbook.md`.
- **Geliştirilen skill**: `skills/video/` (Wave 1, genel video) farklı; `video-automation/`
  pipeline mimarisine odaklı yeni modül.
- **Alınmayanlar**: browser-use tool kodu kurulmadı/çalıştırılmadı (yeni bağımlılık = MAJOR).
  "12 hard rules" metninin kendisi kopyalanmadı; prensipler özetlendi.
- **Lisans değerlendirmesi**: MIT ✓ — ticari kullanım serbest. İçerik uyarlandı.
- **BUZSU kullanım amacı**: Suvesu.com'un bilgi içerikleri → video formatı dönüşümü için
  "metin önce" yaklaşım çok uygun (içerik zaten metin tabanlı). Video üretim planlamada
  ses/transkripsiyon önceliği pratiği kullanılabilir.

#### harry0703/MoneyPrinterTurbo (MIT)

- **Analiz edildi**: 6 aşamalı kısa video pipeline (senaryo → görsel kaynak →
  TTS seslendirme → altyazı → müzik → yayın); royalty-free kaynak seçenekleri
  (Pexels/Pixabay/Coverr); Türkçe dahil çoklu TTS desteği; 9:16 ve 16:9 format;
  Claude dahil çoklu LLM entegrasyonu; MVC mimari; Docker/Windows deployment.
- **Oluşturulan dosyalar**: `skills/video-automation/` (birleşik kaynak),
  `knowledge/video-workflows.md`, `playbooks/video-automation-playbook.md`,
  `templates/video-script-template.md`.
- **Geliştirilen skill**: `skills/video/` (Wave 1) bu repoya referans vermemişti;
  `video-automation/` modülü bu pipeline'ı entegre etti.
- **Alınmayanlar**: Yazılım kurulmadı/çalıştırılmadı (yeni bağımlılık = MAJOR; Docker
  setup = MAJOR). Kaynak kodu kopyalanmadı. TwelveLabs, Azure gibi ücretli servis
  entegrasyonları eklenmedi (yeni bağımlılık).
- **Lisans değerlendirmesi**: MIT ✓ — ticari kullanım serbest. Pipeline mantığı uyarlandı.
- **BUZSU kullanım amacı**: Buzsu ürün tanıtım videoları ve Suvesu eğitim klipleri için
  6 aşamalı pipeline çerçevesi rehber olarak kullanılacak. Türkçe TTS ve royalty-free
  görsel kaynakları (Pexels/Pixabay/Coverr) özellikle değerli.

### Oluşturulan Dosyalar (Wave 2 Özeti)

| Kategori | Yeni Dosya | Güncellenen Dosya |
|---|---|---|
| `skills/coding/` | 5 | 0 |
| `skills/debugging/` | 5 | 0 |
| `skills/refactoring/` | 5 | 0 |
| `skills/planning/` | 5 | 0 |
| `skills/frontend/` | 5 | 0 |
| `skills/performance/` | 5 | 0 |
| `skills/video-automation/` | 5 | 0 |
| `playbooks/` | 5 | 0 |
| `knowledge/` | 4 | 0 |
| `templates/` | 4 | 0 |
| `reports/external-repo-integration-report.md` | 0 | 1 |
| **Toplam** | **48** | **1** |

### Wave 2 Lisans Özeti

| Repo | Lisans | Kullanım Kararı |
|---|---|---|
| vercel-labs/skills | Bulunamadı | Yalnızca genel desen uyarlandı |
| multica-ai/andrej-karpathy-skills | Bulunamadı | Kavramsal çerçeve uyarlandı, metin kopyalanmadı |
| browser-use/video-use | MIT ✓ | Uyarlandı |
| harry0703/MoneyPrinterTurbo | MIT ✓ | Uyarlandı |

### Sonraki Yapılacaklar (Wave 2 Sonrası)

- [ ] `vercel-labs/skills` ve `multica-ai/andrej-karpathy-skills` lisans durumunu doğrula.
- [ ] `skills/coding/` prensiplerini AGENTS.md'ye referans olarak ekle (MINOR, onay gerekli).
- [ ] Video automation için gerçek bir pilot içerik (Suvesu → YouTube Shorts) dene;
  `playbooks/video-automation-playbook.md`'yi güncelle.
- [ ] Türkçe TTS servisi karşılaştırması için görev aç (Edge TTS TR kalitesi değerlendirmesi).
