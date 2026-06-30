# PHP — Genel Backend Güvenliği ve Kalitesi — Kontrol Listesi

- [ ] Kullanıcı girdisi çıktıya basılmadan önce escape ediliyor mu (XSS önleme)?
- [ ] Tüm veritabanı sorguları parametreli mi (SQLi önleme)?
- [ ] Dosya yükleme noktası MIME + uzantı + boyut kontrolü yapıyor mu?
- [ ] Dış URL/SSRF riski taşıyan istekler (webhook, fetch) allowlist ile sınırlı mı?
- [ ] composer.lock güncel ve bilinen kritik zafiyet yok mu (audit taslağı)?
- [ ] Hata sayfaları production'da stack trace göstermiyor mu?
- [ ] Oturum/cookie ayarları (HttpOnly, Secure, SameSite) doğru mu?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
