# Performans Denetimi Şablonu

## Kullanım

Sayfa hızı denetimi için bu şablonu kullan. `skills/performance/` ve
`playbooks/performance-playbook.md` rehber.

---

## Hedef Sayfa

- **URL**: <tam URL>
- **Cihaz**: [ ] Mobile [ ] Desktop (mobile öncelikli)
- **Ölçüm Aracı**: [ ] Lighthouse [ ] PageSpeed Insights [ ] WebPageTest
- **Ölçüm Tarihi**: <tarih>

## Mevcut Skorlar

| Metrik | Mevcut | Hedef |
|---|---|---|
| Performance | | 90+ |
| LCP | | < 2.5s |
| CLS | | < 0.1 |
| INP | | < 200ms |
| FCP | | |
| TTFB | | |

## Tespit Edilen Sorunlar

| Sorun | Etki | Çözüm Önerisi | Öncelik | Sınıf |
|---|---|---|---|---|
| | Yüksek/Orta/Düşük | | P1/P2/P3 | SAFE PATCH/MAJOR |

## P1 Aksiyon Planı

1. <En yüksek etkili düzeltme>
2. <İkinci düzeltme>

## Doğrulama

Düzeltme sonrası:

- [ ] Staging'de Lighthouse tekrar çalıştırıldı
- [ ] Görsel bütünlük bozulmadı
- [ ] Canlıya alındı (MAJOR → insan onayı alındı)
