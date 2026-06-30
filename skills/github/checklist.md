# GitHub — Branch, PR ve İnceleme Akışı — Kontrol Listesi

- [ ] Değişiklik feature branch üzerinde mi (main'e doğrudan commit yok)?
- [ ] Commit mesajı `<tip>: <özet>` formatında mı?
- [ ] PR açmadan önce kullanıcıdan açık talep alındı mı?
- [ ] Push öncesi değişiklikler kullanıcıya özetlendi mi (bu repo için: 'commit öncesi göster' kuralı)?
- [ ] PR şablonu varsa (varsa) bölümleri dolduruldu mu?
- [ ] Hassas bilgi (token, .env) commit içeriğinde yok mu?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
