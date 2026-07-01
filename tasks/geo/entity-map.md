# Entity Mapping — GEO/AEO Çalışması

> Stub doküman. `geo-agent`, `skills/geo/` ve `playbooks/aylik-geo-audit.md` bu dosyaya
> ekleme yapar. Entity'lerin kendisi burada tanımlanmaz — `knowledge-graph/` altındaki
> ilgili dosyaya referans verilir (kopyalama yok, çakışma önlenir).

## Amaç

Buzsu ve Suvesu içeriklerinin hangi `knowledge-graph/` entity'leriyle ve hangi
arama sorgularıyla eşleştiğini tek bir yerde takip etmek. Bu eşleştirme:

- GEO (Generative Engine Optimization) içerik üretiminde hangi entity'nin hangi
  sayfada/sorguda kullanılacağını netleştirir
- AI Overview / Copilot alıntı analizinde hangi entity'lerin alıntılandığını izler
- Aylık GEO/AEO denetiminde (`playbooks/aylik-geo-audit.md`) entity tutarlılığı
  kontrolü için referans tablo görevi görür

## Entity Mapping Süreci

1. `geo-agent` veya `skills/geo/` bir görev kapsamında hedef sorguyu/sayfayı belirler.
2. İlgili entity `knowledge-graph/` altında aranır (örn. `products/`, `technologies/`,
   `contaminants/`, `faq/`). Entity yoksa yeni entity dosyası **burada değil**,
   `knowledge-graph/<kategori>/` altında oluşturulur.
3. Aşağıdaki tabloya bir satır eklenir: sorgu/sayfa ↔ entity dosya yolu ↔ durum.
4. Entity içeriği asla bu dosyaya kopyalanmaz — yalnızca dosya yoluyla referans verilir.
5. Aylık denetimde (`playbooks/aylik-geo-audit.md` adım 3, 5) tablo gözden geçirilir;
   alıntılanma durumu ve tutarlılık notu güncellenir.

## Girdi

- Hedef sorgu veya sayfa URL'si (Buzsu.com.tr / Suvesu.com)
- Serper AI snippet taraması sonucu (alıntılanıyor mu, hangi kaynak alıntılanıyor)
- `knowledge-graph/` içindeki ilgili entity dosyasının yolu
- Aylık denetimde: önceki ay entity mapping tablosu (bu dosyanın önceki hali)

## Çıktı

| Sorgu / Sayfa | İlgili Entity (`knowledge-graph/...`) | AI Overview Durumu | Son Kontrol | Not |
|---|---|---|---|---|
| *(henüz veri yok — ilk geo-agent görevinde doldurulur)* | | | | |

Görev sonu JSON raporu (geo-agent tarafından `tasks/geo/<görev-id>.md` içine yazılır,
bu dosya yalnızca tabloyu tutar).

## Sonraki Adımlar

- [ ] İlk GEO görevi çalıştırıldığında tabloya ilk satırlar eklenecek
- [ ] `knowledge-graph/` 10 seed entity için mevcut sayfa eşleşmeleri geriye dönük taranacak
- [x] Sprint-6 tamamlandı — `knowledge-graph/` 10 seed'den 39 entity'ye genişletildi (29 yeni dosya: `brands/`, `products/`, `components/`, `contaminants/`, `problems/`, `technologies/`, `standards/`, `certifications/`). Bu tablo henüz güncellenmedi çünkü satır eklemek için gerçek Serper/GSC sorgu-sayfa verisi gerekir (bkz. madde 4, "Entity içeriği asla bu dosyaya kopyalanmaz").
- [ ] Sprint-6 sonrası 29 yeni entity için gerçek sorgu/sayfa eşleştirmesi entity-seo skill ile yapılacak; Serper AI snippet taraması sonuçları geldiğinde bu tabloya satır olarak eklenecek
