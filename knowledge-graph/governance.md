# Knowledge Graph Yönetim Kuralları

## Genel Bakış
Bu belge BUZSU knowledge-graph/ klasörünün nasıl yönetileceğini,
entity ve ilişkilerin nasıl ekleneceğini ve güncelleneceğini tanımlar.

## Temel Kurallar

1. **Doğrulanmış bilgi** — Entity bilgisi bağımsız teyit edilemeyen iddia içeremez.
2. **Minimum PII** — Kişi entity'leri yalnızca kamuya açık bilgi içerir; müşteri bilgisi girmez.
3. **Sürüm takibi** — Her güncelleme commit mesajında ve ilgili task dosyasında belgelenir.
4. **Onay gereksinimi** — Yeni entity tipi veya kritik ilişki değişikliği = MINOR sınıf, onay gerekli.

## Değişiklik Sınıfları

| Değişiklik | Sınıf |
|---|---|
| Yazım düzeltmesi, format güncelleme | SAFE PATCH |
| Mevcut entity bilgisi güncelleme | SAFE PATCH |
| Yeni entity tipi ekleme | MINOR |
| Yeni ilişki tipi ekleme | MINOR |
| Entity silme veya birleştirme | MINOR |
| Canlı şemaya etki eden değişiklik | MAJOR |

## Güncelleme Süreci

### SAFE PATCH
1. İlgili dosyayı düzenle
2. Değişikliği commit et: `docs: [entity adı] entity güncellendi`

### MINOR / MAJOR
1. Değişiklik taslağını /drafts/knowledge-graph/[dosya].md olarak yaz
2. Task dosyası oluştur: /tasks/knowledge-graph/[görev].md
3. İnsan onayı al
4. Onay sonrası uygula ve commit et

## Tutarlılık Kontrolü
- Entity tipleri her zaman entity-types.md ile senkronize olmalı
- İlişkiler relationship-types.md ile eşleşmeli
- schema.org property'leri resmi belgeden doğrulanmalı

## Referans Dosyalar
- knowledge-graph/entity-types.md
- knowledge-graph/relationship-types.md
- knowledge/entity-relationships.md
- skills/entity-seo/
