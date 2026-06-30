# Performance — Kontrol Listesi

## LCP (Largest Contentful Paint)

- [ ] Hero görsel `priority` flag mı? `<Image>` kullanılıyor mu?
- [ ] Above-the-fold CSS inline mi?
- [ ] LCP elementi nedir? 2.5s altında mı?

## CLS (Cumulative Layout Shift)

- [ ] Görsellere `width` ve `height` atlandı mı?
- [ ] Web font yüklenirken layout kayıyor mu? (`font-display: swap` var mı?)
- [ ] Dinamik içerik (banner, reklam) rezerve alan kullanıyor mu?

## INP (Interaction to Next Paint)

- [ ] Kullanıcı etkileşimi sonrası sayfa 200ms içinde yanıt veriyor mu?
- [ ] Ağır JavaScript main thread'i bloklıyor mu?

## Genel

- [ ] Üçüncü parti scriptler defer/async mı?
- [ ] Cache-Control başlıkları doğru mu?
- [ ] Lighthouse skoru ölçüldü mü? (Target: 90+ mobile)

## Genel BUZSU Kuralları

- [ ] Analiz `drafts/` altına yazıldı
- [ ] Canlı değişiklik için branch + PR hazır
