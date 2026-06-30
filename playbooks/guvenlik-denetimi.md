# Playbook: Güvenlik Denetimi

İlgili skill'ler: `skills/security/`, `skills/php/`, `skills/codeigniter4/`

## Adımlar

1. **Secret taraması** (`skills/security/`) — repo içinde `secrets`, `credentials`, `token`,
   `password` içeren dosya adı/içeriği taraması (CLAUDE.md güvenlik kuralı).
2. **Girdi doğrulama denetimi** (`skills/php/`, `skills/codeigniter4/`) — Query Builder
   kullanımı, CSRF filtresi, Validation kütüphanesi kontrolü.
3. **Bağımlılık denetimi** — composer/npm bağımlılıklarında bilinen güvenlik açığı taraması
   (yalnızca rapor; yeni paket eklenmesi ayrı MAJOR karardır).
4. **PII kontrolü** — draft/output dosyalarında müşteri telefon/isim verisi olup olmadığı
   kontrol edilir; varsa anonimleştirilir veya silinir.
5. Bulgular `drafts/content/guvenlik-denetimi-<tarih>.md` altına yazılır; kritik bulgu varsa
   kullanıcıya hemen bildirilir (otomatik düzeltme yapılmaz).

## Sınır

Bu playbook penetrasyon testi veya exploit geliştirme içermez; yalnızca BUZSU'nun kendi kod
tabanı için savunma amaçlı statik denetim sağlar.
