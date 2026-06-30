# Entity SEO — Yapılandırılmış Varlık Optimizasyonu — Kontrol Listesi

- [ ] Marka adı (Buzsu, Suvesu) tüm sayfalarda tutarlı yazılıyor mu (büyük/küçük harf, boşluk varyasyonu yok)?
- [ ] Ürün isimleri knowledge-graph/products/ ile birebir eşleşiyor mu?
- [ ] NAP bilgisi (varsa fiziksel adres/telefon) site genelinde ve dış dizinlerde tutarlı mı?
- [ ] Organization schema'da sameAs alanları (sosyal medya, basın) dolu mu?
- [ ] Yeni bir entity (ürün/teknoloji/kirletici) tanıtıldığında knowledge-graph/ altına karşılığı eklendi mi?
- [ ] Entity ilişkileri (ürün → teknoloji → kirletici) knowledge-graph/api/relations.ts ile tutarlı mı?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
