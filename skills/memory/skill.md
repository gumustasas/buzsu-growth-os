---
name: memory
description: buzsu-growth-os'ta görev/karar geçmişinin oturumlar arası tutarlı şekilde takip edilmesi (zaten /tasks ve knowledge-graph/ ile kısmen yapılıyor; bu skill pratiği formelleştirir).
---

# Memory — Oturumlar Arası Bağlam

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "memory ile ilgili ...") veya ilgili agent (Yok — Orchestrator'ın görev takibi (AGENTS.md) ile doğrudan ilişkili.) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Gözlem-tabanlı kayıt: her görev sonunda ham detay değil, özet karar/sonuç kaydı (`tasks/<alan>/<görev-id>.md` JSON raporu zaten bu mantıkla çalışıyor)
- 3 katmanlı erişim: önce görev dosyası başlığı/özeti, sonra ilgili tasks/ klasörü, son olarak gerekiyorsa outputs/reports/ tam detayı
- Gizlilik sınırı: PII içeren bilgi hiçbir bellek katmanına yazılmaz (CLAUDE.md güvenlik kuralı ile birebir aynı ilke — `<private>` etiketi yerine CLAUDE.md'nin 'PII /outputs veya /drafts'a yazılmaz' kuralı uygulanır)
- Açık madde (open_items) takibi: her görev sonu raporunun open_items alanı bir sonraki oturumun başlangıç noktasıdır

## Sınır

Bu skill yeni bir depolama mekanizması (örn. SQLite, vektör DB) ÖNERMEZ — bu yeni bağımlılık/servis eklemek anlamına gelir (MAJOR, yasaklar listesinde). Mevcut dosya-tabanlı (/tasks, /knowledge-graph) yapıyı kullanır.

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
