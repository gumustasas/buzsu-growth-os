# GEO — Generative Engine Optimization — Kontrol Listesi

- [ ] Googlebot ve büyük AI crawler'lar (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) robots.txt'te engellenmemiş mi?
- [ ] Sayfa noindex veya nosnippet/max-snippet:0 direktifi taşımıyor mu?
- [ ] İlk paragrafta hedef soruya doğrudan, kısa bir cevap cümlesi var mı?
- [ ] Cevap blokları 120-180 kelime aralığında, bağlamdan koparılınca da anlamlı mı?
- [ ] İstatistik veya kaynak atfı var mı (Princeton GEO bulgusu: +%37/+%40 alıntı artışı)?
- [ ] Liste/tablo/tanım kutusu gibi çıkarılabilir (extractable) format kullanılmış mı?
- [ ] Yazar/güncelleme tarihi görünür mü (içerik tazeliği sinyali)?
- [ ] FAQ veya HowTo schema ile eşleşen yapılandırılmış veri var mı (schema-agent'a görev gerekir mi)?
- [ ] 'Buzsu su arıtma' markalı sorgusu AI sonuçlarında nasıl görünüyor (Serper AI snippet ile kontrol edildi mi)?
- [ ] llms.txt dosyası mevcut mu / önerildi mi (opsiyonel)?
- [ ] İçeriğin son güncellemesi 3 aydan eski mi (alıntı uçurumu riski)?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
