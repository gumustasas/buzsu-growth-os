# Playbook: Performans Optimizasyonu Uçtan Uca

İlgili skill'ler: `skills/performance/`, `skills/frontend/`, `skills/seo/`

## Adımlar

1. **Baseline ölç** — Lighthouse / PageSpeed Insights ile LCP, CLS, INP skorları.
   Hangi sayfa? Hangi cihaz? (mobile öncelikli — Türkiye'de mobil kullanım yüksek)
2. **Kök neden tespiti** (`skills/performance/`) — LCP mı? CLS mı? INP mı?
   Görsel mi? JavaScript mı? Font mu? Üçüncü parti script mi?
3. **Öncelik sırası** — en yüksek etki / en az çaba.
4. **Taslak düzeltmeler** (`skills/frontend/`) — `<Image>`, lazy load, defer script, önbellekleme.
5. **Staging testi** — skorlar iyileşti mi? Görsel bütünlük bozulmadı mı?
6. **Canlı uygulama** — MAJOR, branch + PR + insan onayı.

## Sınır

Yeni CDN/servis MAJOR. Vercel yapılandırma değişikliği MAJOR. Analiz ve taslak SAFE PATCH.
