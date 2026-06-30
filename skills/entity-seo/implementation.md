# Entity SEO — Yapılandırılmış Varlık Optimizasyonu — BUZSU Uygulama Adımları

## Adımlar

1. Yeni entity tespit edildiğinde önce `knowledge-graph/<kategori>/` altında ilgili dosyanın var olup olmadığını kontrol et.
2. Eksikse taslağı `drafts/content/entity-<isim>.md` altına yaz; onay sonrası knowledge-graph/ altına taşınır (MINOR sınıf — /outputs taşıma kuralına benzer).
3. Entity tutarlılık denetimini `tasks/seo/` veya `tasks/geo/` altında ilgili göreve ek bulgu olarak raporla.
4. Schema karşılığı gerekiyorsa schema-agent'a görev üret.
5. Görev sonu JSON raporu ilgili görev dosyasına eklenir.

## Sınır / Onay Notu

knowledge-graph/ içine doğrudan yeni entity eklemek MINOR sınıf sayılır (mevcut agent davranışını/veri yapısını genişletme) — önce drafts/'a yazılır, onay sonrası taşınır.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — knowledge-graph/ altyapısını kullanır; eeat-agent ve geo-agent ile kesişir. Yeni agent önerisi MINOR.`
- Bu modülün kontrol listesi: `skills/entity-seo/checklist.md`
- Örnek promptlar: `skills/entity-seo/prompts.md`
