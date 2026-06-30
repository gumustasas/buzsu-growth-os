# Vercel — Dağıtım ve Gözlemlenebilirlik — Kontrol Listesi

- [ ] Deploy kararından önce son build log'u incelendi mi?
- [ ] Runtime hata logları (varsa) kök nedene göre raporlandı mı?
- [ ] Ortam değişkeni önerisi varsa değer draft dosyasına yazılmadı, yalnızca isim/ne işe yaradığı belirtildi mi?
- [ ] Preview deployment ile production deployment net ayrıldı mı?
- [ ] Production'a deploy talebi kullanıcıdan açıkça geldi mi?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
