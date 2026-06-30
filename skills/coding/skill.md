---
name: coding
description: BUZSU platform kodlamasında uygulanan Karpathy ilkeleri — varsayım netleştirme, basitlik, cerrahi değişiklik ve doğrulanabilir hedef tanımı.
---

# Coding

## Ne Zaman Devreye Girer

Herhangi bir kod değişikliği görevinde: yeni özellik, hata düzeltme, entegrasyon,
API endpoint, UI bileşeni. Özellikle görev belirsizse veya birden fazla çözüm yolu varsa.

## Dört Temel Prensip (Karpathy çerçevesinden BUZSU'ya uyarlandı)

1. **Kod yazmadan önce varsayımları aç** — belirsiz görevde önce anlaşılan ile
   anlaşılmayanı kısa liste olarak sun; sessizce ilerleme, yanlış bir yönde 100 satır
   yazmaktan daha pahalıdır.
2. **Basitliği seç** — çalışan en basit çözüm yerine "ileride lazım olur" sezgisiyle
   soyutlama ekleme. BUZSU küçük ölçekli: 3 benzer satır, erken soyutlamadan daha iyi.
3. **Cerrahi değişiklik** — yalnızca görevin kapsamındaki kodu değiştir; komşu
   "iyileştirme fırsatı" görsen bile dokunma (ayrı görev açılabilir).
4. **Doğrulanabilir hedef** — görev tamamlandığında "başarı" neye benziyor? Somut çıktı
   (URL, terminal çıktısı, test geçişi) olmayan görev tamamlanamaz sayılır.

## Sınır

- Onaysız yeni npm/composer paketi eklenmez (CLAUDE.md: yeni bağımlılık = MAJOR).
- Mimari karar alma (yeni tablo, yeni servis, yeni entegrasyon) MAJOR sınıf, doğrudan
  kod yazmak yerine taslak/öneri üretilir.
- Bu skill AGENTS.md'deki ajan sınırlarını geçersiz kılmaz.
