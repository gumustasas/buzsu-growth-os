# Güvenlik Denetimi — BUZSU Uygulama Adımları

## Adımlar

1. Bulguları kritiklik sırasına göre `outputs/audits/` altına (onay sonrası) taşınmak üzere `drafts/` içinde taslakla.
2. Kritik/acil bulgu varsa kullanıcıyı hemen bilgilendir — beklenmeden raporla.
3. Düzeltme önerisi kod değişikliği gerektiriyorsa branch+PR taslağı (`drafts/code/`).

## Sınır / Onay Notu

Bu kapsamda yalnızca savunma amaçlı, salt-okunur denetim yapılır; otomatik düzeltme/patch uygulama yoktur.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — skills/php/ ve skills/codeigniter4/ ile birlikte çalışır. Ayrı bir 'security-agent' eklenmesi MINOR, sonraki adımlarda önerilecek.`
- Bu modülün kontrol listesi: `skills/security/checklist.md`
- Örnek promptlar: `skills/security/prompts.md`
