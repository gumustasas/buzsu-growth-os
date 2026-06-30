# Coding — Kontrol Listesi

## Kod Yazmadan Önce

- [ ] Görevin başarı kriteri net mi? Eğer değilse soru sor.
- [ ] Hangi dosyalar/fonksiyonlar etkilenecek? Liste yap.
- [ ] Mevcut kod stiliyle uyumlu mu? (CI4 konvansiyonu, Next.js app router kuralları)
- [ ] Yeni bağımlılık gerekiyor mu? → MAJOR, önce onay al.

## Kodlama Sırasında

- [ ] Değişiklik yalnızca görevin kapsamında mı?
- [ ] Ham SQL var mı? → Query Builder ile değiştir (injection önleme).
- [ ] Kimlik bilgisi/token/anahtar kod içine yazılmış mı? → env var kullan.
- [ ] Her fonksiyon tek sorumluluk mu taşıyor?

## Kod Yazdıktan Sonra

- [ ] Çıktı `drafts/code/` altına yazıldı mı?
- [ ] Canlıya uygulanacaksa branch + PR taslağı hazır mı?
- [ ] Değişiklik komşu/alakasız kodu bozuyor mu?

## Genel BUZSU Kuralları

- [ ] Çıktı önce `/drafts` altına yazıldı
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı
- [ ] Kod değişikliği varsa branch + PR taslağı hazırlandı
- [ ] Müşteri PII draft/output dosyalarına yazılmadı
