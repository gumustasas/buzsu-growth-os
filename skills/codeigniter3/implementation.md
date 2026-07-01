# CodeIgniter 3.7.1 — Platform Geliştirme — BUZSU Uygulama Adımları

## Adımlar

1. Kod denetimi/öneri görevini ilgili alan agent'ının (örn. cro-agent kod önerisi) görev dosyasına bağla.
2. Bulguyu `drafts/code/<özellik>-ci3.md` altına branch+PR taslağı olarak yaz.
3. Güvenlik açığı şüphesi varsa skills/security/ modülüyle çapraz kontrol et.
4. Doğrudan main'e veya canlıya kod yazma; her zaman taslak + PR önerisi.

## CI3.7.1 Klasör Yapısı

```
application/
├── controllers/
├── models/
├── views/
├── libraries/
├── helpers/
├── config/
└── logs/
```

## Sınır / Onay Notu

Kod değişikliği = branch + PR önerisi (CLAUDE.md madde 3). Yeni composer paketi eklenmesi MAJOR, yasaklar listesinde.

## İlgili Dosyalar

- İlgili agent tanımı: `Yok — kod değişikliği önerileri otomatik olarak ilgili alan agent'ı (cro-agent, schema-agent) üzerinden drafts/code/'a yazılıyor. Ayrı bir 'platform-agent' eklenmesi MINOR, şu an önerilmiyor.`
- Bu modülün kontrol listesi: `skills/codeigniter3/checklist.md`
- Örnek promptlar: `skills/codeigniter3/prompts.md`
