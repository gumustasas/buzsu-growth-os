# Memory — Oturumlar Arası Bağlam

## Amaç

buzsu-growth-os'ta görev/karar geçmişinin oturumlar arası tutarlı şekilde takip edilmesi (zaten /tasks ve knowledge-graph/ ile kısmen yapılıyor; bu skill pratiği formelleştirir).

## İlgili Agent

Yok — Orchestrator'ın görev takibi (AGENTS.md) ile doğrudan ilişkili.

## İncelenen Dış Kaynaklar

- **thedotmack/claude-mem** — Zengin kaynak. Gözlem-tabanlı bellek modeli (ham transkript yerine ayrık gözlem/karar kaydı), 3 katmanlı sorgu akışı (önce kompakt indeks ~50-100 token → zaman çizelgesi → yalnızca ilgili gözlem için tam detay — token israfını önler), hibrit arama (tam metin + semantik), gizlilik sınırı (`<private>` etiketiyle hassas içeriği hariç tutma) ve görev bazlı 'progressive context injection' deseni.

> Kör kopyalama yapılmadı; yalnızca BUZSU bağlamına uyarlanabilir pratik/desen çıkarıldı. Detaylı atıf için bkz. kök dizindeki `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md` — Claude Code skill tanımı (ne zaman devreye girer, sorumluluklar, iş akışı)
- `checklist.md` — Uygulama/denetim kontrol listesi
- `prompts.md` — Örnek görev promptları (Türkçe)
- `implementation.md` — BUZSU'ya özel uygulama adımları ve sınırlar

## Onay Notu

Bu skill yeni bir depolama mekanizması (örn. SQLite, vektör DB) ÖNERMEZ — bu yeni bağımlılık/servis eklemek anlamına gelir (MAJOR, yasaklar listesinde). Mevcut dosya-tabanlı (/tasks, /knowledge-graph) yapıyı kullanır.
