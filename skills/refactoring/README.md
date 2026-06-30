# Refactoring — Cerrahi Yeniden Yapılandırma

## Amaç

BUZSU'nun kod tabanında yalnızca istenen kapsamda, davranış değiştirmeden yapısal iyileştirme.
Komşu koda dokunmadan, "ileride lazım olur" sezgisiyle soyutlama eklemeden.

## İlgili Agent

Yok — kod değişikliği isteyen tüm agent'lar bu kuralları uygular.

## İncelenen Dış Kaynaklar

- **multica-ai/andrej-karpathy-skills** — "Surgical modifications" (yalnızca istenen yeri
  değiştir) ve "anti-overengineering" (spekülatif soyutlama ekleme) prensipleri.
  (Lisans: bulunamadı — kavramsal çerçeve uyarlandı.)

> Lisans atıfları için bkz. `reports/external-repo-integration-report.md`.

## Bu Modüldeki Dosyalar

- `skill.md`, `checklist.md`, `prompts.md`, `implementation.md`

## Onay Notu

Refactoring taslağı SAFE PATCH. Canlı uygulama MAJOR.
