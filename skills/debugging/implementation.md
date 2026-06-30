# Debugging — BUZSU Uygulama Adımları

1. **Hatayı belgele** — tam mesaj, stack trace, tetikleyen adımlar.
2. **Yeniden üret** — local/staging'de minimum senaryo ile tekrarla.
3. **İzole et** — dış servisleri (Airtable, n8n) tek tek çıkararak kök nedeni daralt.
4. **Hipotezi doğrula** — log/unit test ile kanıtla, "sanırım" diyerek düzeltme yapma.
5. **Taslak çözüm** — `drafts/code/<hata-kisa-adi>.md` altına yaz.
6. **Görev sonu raporu** ekle.

## Onay Notu

Teşhis ve taslak: SAFE PATCH. Canlı düzeltme: MAJOR.

## İlgili Dosyalar

- `skills/coding/` — genel kodlama kuralları
- `skills/refactoring/` — düzeltme sonrası temizlik
- `playbooks/debugging-playbook.md`
