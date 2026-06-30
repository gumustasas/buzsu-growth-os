# Memory — Oturumlar Arası Bağlam — BUZSU Uygulama Adımları

## Adımlar

1. Her görev/agent kendi JSON görev sonu raporunu üretmeye devam eder (AGENTS.md zaten tanımlı — bu skill yeni bir mekanizma eklemez, mevcut pratiği belgeler).
2. Yeni bir oturuma başlarken ilgili `tasks/<alan>/` ve `knowledge-graph/` içeriği önce taranır.
3. PII filtresi her zaman CLAUDE.md güvenlik kurallarına göre uygulanır.

## Sınır / Onay Notu

Bu skill yeni bir depolama mekanizması (örn. SQLite, vektör DB) ÖNERMEZ — bu yeni bağımlılık/servis eklemek anlamına gelir (MAJOR, yasaklar listesinde). Mevcut dosya-tabanlı (/tasks, /knowledge-graph) yapıyı kullanır.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — Orchestrator'ın görev takibi (AGENTS.md) ile doğrudan ilişkili.`
- Bu modülün kontrol listesi: `skills/memory/checklist.md`
- Örnek promptlar: `skills/memory/prompts.md`
