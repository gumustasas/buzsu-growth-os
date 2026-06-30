# MCP — Model Context Protocol Entegrasyonları

## Amaç

Buzsu Growth OS için MCP sunucu/araç tasarımı ve mevcut MCP entegrasyonlarının (Airtable, n8n, GitHub, Vercel) doğru ve güvenli kullanımı.

## İlgili Agent

Yok — automation-agent dış sistem entegrasyonlarını kapsıyor; MCP-spesifik tasarım kararları bu skill'e referans verir.

## İncelenen Dış Kaynaklar

- **czlonkowski/n8n-mcp** — MCP sunucu tasarımı için somut referans örnek: salt-okuma keşif araçları (search_nodes, get_node) ile yazma/yönetim araçlarının (workflow CRUD, credential) ayrı kategorilerde tutulması — Buzsu'nun 'okuma serbest, yazma onaylı' ilkesiyle birebir örtüşüyor.
- **daymade/claude-code-skills** — 'MCP builder' türü meta-skill kavramı: entegrasyon sunucusu oluşturmayı yönlendiren skill yapısı referans alındı (kod kopyalanmadı).
- **anthropics/skills** — Genel skill kataloğunda 'Development & Technical' kategorisi altında MCP server generation skill'inin var olduğu teyit edildi; somut içerik incelenmedi, yalnızca kategori referansı.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Yeni MCP sunucusu/dış sistem bağlantısı CLAUDE.md tablosunda 'Dış sistem yazma bağlantısı' → MAJOR, onay gerekir.
