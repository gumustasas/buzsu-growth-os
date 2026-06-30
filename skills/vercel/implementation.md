# Vercel — Dağıtım ve Gözlemlenebilirlik — BUZSU Uygulama Adımları

## Adımlar

1. Vercel MCP araçlarıyla yalnızca okuma (deployment/log/domain) yap.
2. Bulguları ilgili görev dosyasına (`tasks/automation/` veya `tasks/platform/`) ekle.
3. Düzeltme kod değişikliği gerektiriyorsa `drafts/code/` altına PR taslağı yaz.
4. Production'a deploy ETME; bu adım her zaman insana aittir (CLAUDE.md madde 1).

## Sınır / Onay Notu

Canlıya otomatik yayın kesin yasak (CLAUDE.md madde 1). Bu skill yalnızca okuma/teşhis için tasarlandı.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — automation-agent dış sistem etkileşimlerini kapsıyor; Vercel'e özel okuma adımları bu skill'de.`
- Bu modülün kontrol listesi: `skills/vercel/checklist.md`
- Örnek promptlar: `skills/vercel/prompts.md`
