# CodeIgniter 4 — Platform Geliştirme — Kontrol Listesi

- [ ] Veritabanı sorguları Query Builder veya parametreli binding ile mi yazılmış (ham string concat yok)?
- [ ] Formlarda CSRF token kontrolü aktif mi?
- [ ] Kullanıcı girdisi (form/query param) Validation kütüphanesiyle doğrulanıyor mu?
- [ ] Hassas bilgi (API anahtarı, token) .env dışında bir dosyada yer almıyor mu?
- [ ] Hata raporlama (display_errors) production ortamında kapalı mı?
- [ ] Route'lar gereksiz yere public değil, filtre/yetkilendirme katmanından geçiyor mu?
- [ ] Yeni bağımlılık composer.json'a eklenmeden önce onay alındı mı (CLAUDE.md: yeni bağımlılık yasak)?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
