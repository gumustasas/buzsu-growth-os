---
name: debugging
description: CI4 backend ve Next.js frontend hatalarını yeniden üret → izole et → çöz adımlarıyla sistematik ayıklama.
---

# Debugging

## Ne Zaman Devreye Girer

Bir hata, beklenmedik davranış veya tutarsızlık bildirildiğinde. Ayrıca "neden çalışmıyor"
sorusuyla başlayan her görevde.

## Temel Pratikler

- **Önce yeniden üret** — hatayı kendi ortamında tekrarlayamıyorsan çözme. Hangi adımlar,
  hangi veri, hangi ortam değişkenlerinin tetiklediğini belgele.
- **Küçük, izole et** — sorunu mümkün olan en küçük senaryoya indir. Tüm uygulama değil,
  tek fonksiyon, tek endpoint.
- **Varsayım değil, kanıt** — "muhtemelen şu yüzden" diyerek düzeltme yapma; önce
  log/test ile kanıtla.
- **Sessiz ilerleme yasak** — hata mesajı anlaşılmıyorsa veya iki çözüm yolu varsa
  kullanıcıya sor; yanlış yönde ilerlemek daha pahalı.

## Sınır

Canlı production ortamında test yapmaz; local/staging'de izole et. Güvenlik açığı
tespit edilirse hemen kullanıcıya bildir, otomatik düzeltme yapma.
