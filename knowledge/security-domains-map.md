# Güvenlik Alanları — BUZSU Platformuna Eşleme

mukul975/Anthropic-Cybersecurity-Skills reposunun kapsadığı genel güvenlik taksonomisinden
(Apache 2.0 lisanslı), yalnızca BUZSU'nun gerçek yüzey alanına uyan kategoriler seçildi.
Repo, geniş bir "skill kataloğu" olduğu için tamamı incelenmedi; aşağıdaki eşleme yalnızca
BUZSU'nun CI3.7.1 + Next.js + Airtable/n8n entegrasyon yüzeyine uygulanabilir kısmı kapsar.

| Genel Güvenlik Alanı | BUZSU Yüzeyi | İlgili Skill |
|---|---|---|
| Girdi doğrulama / injection önleme | CI3.7.1 form/checkout uçları | `skills/codeigniter3/`, `skills/php/` |
| Secret/credential yönetimi | .env, Airtable API anahtarı, n8n credential'ları | `skills/security/` (CLAUDE.md güvenlik kurallarıyla birebir) |
| API/entegrasyon güvenliği | n8n webhook'ları, Airtable yazma uçları | `skills/n8n/`, `skills/mcp/` |
| PII/veri minimizasyonu | Müşteri telefon/isim verisi | `skills/security/` — CLAUDE.md'deki PII kuralının doğrudan uygulaması |
| Bağımlılık/tedarik zinciri | composer/npm paketleri | `skills/php/`, `skills/codeigniter3/` (yeni paket = MAJOR) |

## Kapsam Dışı Bırakılanlar

Repo kataloğundaki kurumsal/red-team odaklı kategoriler (pentest otomasyonu, exploit
geliştirme vb.) BUZSU'nun küçük ölçekli e-ticaret yüzeyiyle alakasız olduğu için alınmadı.
