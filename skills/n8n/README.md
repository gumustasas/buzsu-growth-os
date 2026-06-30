# n8n — Otomasyon İş Akışları

## Amaç

Serper takibi, Airtable senkronizasyonu ve bildirim akışları için n8n workflow tasarımı.

## İlgili Agent

agents/automation-agent.md (mevcut)

## İncelenen Dış Kaynaklar

- **czlonkowski/n8n-mcp** — En zengin kaynak. 2.063 n8n node'una yapılandırılmış erişim sağlayan MCP sunucusu. Önerilen iş akışı süreci (önce template arama, sonra node keşfi, config, doğrulama, build, tekrar doğrulama, deploy) birebir uyarlandı. Kritik uyarılar: 'production workflow'u doğrudan AI ile düzenleme', varsayılan parametrelerin #1 hata kaynağı olması, IF node'larda TRUE/FALSE branch'in açıkça belirtilmesi gerekliliği — bu repo aynı zamanda bu ortamda gerçek bir MCP sunucusu (mcp__n8n__*) olarak zaten bağlı.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

n8n'e canlı/production yazma MAJOR sınıf, CLAUDE.md yasaklar listesinde ('Airtable, n8n veya Vercel'e insan onayı olmadan production yazma yapmak' yasak).
