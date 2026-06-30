# Debugging — Kontrol Listesi

## Hata Teşhisi

- [ ] Hata mesajı tam olarak okundu mu?
- [ ] Hangi adımla tetiklendiği tespit edildi mi?
- [ ] Log/stack trace mevcut mu? Nereden alınacağı biliniyor mu?
- [ ] CI4: `writable/logs/` kontrol edildi mi?
- [ ] Next.js: browser console + server log birlikte incelendi mi?

## İzolasyon

- [ ] Hata minimum tekrarlama senaryosuna indirildi mi?
- [ ] Dış bağımlılıklar (Airtable, n8n, API) devre dışı bırakıldığında sorun devam ediyor mu?
- [ ] Mevcut kod değişikliklerinin mi yoksa config/data'nın mı sorunu olduğu ayrıştırıldı mı?

## Çözüm

- [ ] Çözüm önce `drafts/code/` altında taslaklandı mı?
- [ ] Düzeltme yalnızca hatanın kök nedenini mi ele alıyor?
- [ ] Komşu kod dokunulmadan kaldı mı?

## Genel BUZSU Kuralları

- [ ] Çıktı önce `/drafts` altına yazıldı
- [ ] Müşteri PII draft/output dosyalarına yazılmadı
- [ ] Canlı site değişikliği varsa branch + PR taslağı hazır
