# Schema.org Yapılandırılmış Veri — Kontrol Listesi

- [ ] Şemadaki fiyat, garanti, teknik özellik mevcut ve doğrulanmış kaynaktan mı geliyor (uydurma yok)?
- [ ] Product schema zorunlu alanları (name, image, offers.price, offers.priceCurrency, availability) eksiksiz mi?
- [ ] FAQPage schema'daki sorular sayfa içeriğiyle birebir örtüşüyor mu (AEO tutarlılığı)?
- [ ] HowTo adımları gerçek kurulum/bakım sürecini yansıtıyor mu?
- [ ] BreadcrumbList sayfa hiyerarşisiyle uyumlu mu?
- [ ] Şema Google Rich Results Test'ten hatasız geçiyor mu (taslakta test sonucu not edildi mi)?
- [ ] Birden fazla şema tipi aynı sayfada çakışmıyor mu (ör. iki farklı Product bloğu)?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
