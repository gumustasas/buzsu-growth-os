# Teknik SEO Denetim Şablonu

Kullanım: Aylık veya proje bazlı teknik SEO denetimi için.
Doldurulan rapor: /drafts/technical-seo-audit-[YYYY-MM].md

---

## Denetim Bilgileri
- Tarih: [YYYY-MM-DD]
- Site: [ ] Buzsu.com.tr  [ ] Suvesu.com
- Araçlar: [GSC, PageSpeed, Screaming Frog vb.]

---

## 1. Taranabilirlik

| Kontrol | Durum | Not |
|---|---|---|
| robots.txt erişilebilir | [ ] OK / [ ] Sorun | |
| Sitemap erişilebilir | [ ] OK / [ ] Sorun | |
| Sitemap GSC'ye gönderildi | [ ] OK / [ ] Sorun | |
| AI bot direktifleri tanımlı | [ ] OK / [ ] Sorun | |
| llms.txt mevcut | [ ] OK / [ ] Yok | |

## 2. İndekslenebilirlik

| Kontrol | Değer | Hedef |
|---|---|---|
| Toplam dizine alınan sayfa | | |
| Hata (dizine alınmayan) | | < 10 |
| Uyarı sayısı | | Azalmalı |
| Noindex etiketi hatalı sayfa | | 0 |

## 3. Core Web Vitals (Mobil)

| Metrik | Mevcut | Hedef | Durum |
|---|---|---|---|
| LCP | | < 2.5 sn | |
| INP | | < 200 ms | |
| CLS | | < 0.1 | |

## 4. Bağlantı Sağlığı

| Kontrol | Değer | Hedef |
|---|---|---|
| 4xx hata sayfası | | < 10 |
| Kırık dahili bağlantı | | 0 |
| Redirect zinciri > 1 hop | | 0 |

## 5. Öncelikli Sorunlar

### P1 — Kritik (hemen müdahale)
1. [Sorun] — [Aksiyon]

### P2 — Önemli (bu sprint)
1. [Sorun] — [Aksiyon]

### P3 — İyileştirme (planlı)
1. [Sorun] — [Aksiyon]

---

## Onay Notu
Bu rapor okuma bazlıdır. Her aksiyon ayrı task dosyasıyla takip edilir.
