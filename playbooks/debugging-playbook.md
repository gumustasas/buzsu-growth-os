# Playbook: Debugging Görevi Uçtan Uca

İlgili skill'ler: `skills/debugging/`, `skills/coding/`

## Adımlar

1. **Hatayı belgele** — tam mesaj, stack trace, tetikleyen adımlar, ortam.
2. **Yeniden üret** — local/staging'de minimum senaryo ile tekrarla.
3. **İzole et** — dış servisleri (Airtable, n8n, API) tek tek çıkararak daralt.
4. **Hipotezi kanıtla** — log/test ile, "sanırım" diyerek değil.
5. **Çözüm taslağı** → `drafts/code/`.
6. **Komşu koda dokunma** — düzeltme yalnızca kök nedeni hedef alır.
7. **Doğrula** → hata tekrarlanmıyor mu?
8. Görev sonu raporu.

## Sınır

Production ortamında test yapılmaz. Güvenlik açığı bulunursa otomatik düzeltme değil,
önce kullanıcıya bildir.
