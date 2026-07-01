# Debugging — Hata Ayıklama Pratikleri

## Amaç

BUZSU'nun CI3.7.1 + Next.js yığınında hataları sistematik biçimde tespit etmek:
önce yeniden üret, sonra küçük, doğrulanabilir adımlarla çöz.

## İlgili Agent

Yok — tüm agent'lar kod değişikliği yapmadan önce bu süreci izler.

## İncelenen Dış Kaynaklar

- **multica-ai/andrej-karpathy-skills** — "Surface confusion rather than proceeding
  silently" ve "test-first debugging" yaklaşımı; tutarsızlığı kodlamadan önce tespit etme
  prensibi. (Lisans: bulunamadı — kavramsal çerçeve uyarlandı, metin kopyalanmadı.)

> Lisans atıfları için bkz. `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md`, `checklist.md`, `prompts.md`, `implementation.md`

## Onay Notu

Hata tespiti ve taslak çözüm SAFE PATCH. Canlı kod değişikliği MAJOR.
