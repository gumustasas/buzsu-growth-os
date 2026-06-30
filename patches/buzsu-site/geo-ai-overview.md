# Patch: GEO — Google AI Overview Optimizasyonu — Buzsu.com.tr

**Hedef:** `https://www.buzsu.com.tr/su-aritma-cihazlari/` ve Suvesu.com içerik sayfaları  
**Sınıf:** MINOR — İnsan onayı gerekli  
**Branch önerisi:** `fix/geo-ai-overview-buzsu`  
**Bağımlı agent:** geo-agent, content-agent, schema-agent

---

## Problem

Google AI Overview (SGE) ve diğer üretken arama motorları "su arıtma cihazları" gibi sorgularda başka kaynaklardan alıntı yapıyor; Buzsu.com.tr ve Suvesu.com bu alıntılarda yer almıyor.

Neden? GEO uyumlu içerik kriterleri karşılanmıyor:
- İlk paragrafta sorguya doğrudan yanıt yok
- Tanım kutusu (definition box) formatı yok
- Liste ve tablo yapısı zayıf
- Entity bağlantısı (Buzsu → su arıtma → RO sistemi) düşük otorite sinyali
- "Buzsu su arıtma" markalı sorgularda AI Overview'da görünürlük yok

---

## Hedef Durum

- "Su arıtma cihazı nasıl seçilir?" sorgusunda Suvesu.com veya Buzsu.com.tr AI Overview'da alıntılanıyor
- Markalı sorgularda ("Buzsu su arıtma") AI Overview Buzsu'yu tanımlıyor
- İçerik yapısı Bing Copilot ve ChatGPT'nin alıntı formatına uygun

---

## Uygulanacak Değişiklikler

### Adım 1: Kategori Sayfası — GEO Uyumlu Giriş Paragrafı

`/su-aritma-cihazlari/` sayfasının H1 altına, mevcut ürün grid'inden önce:

```html
<!-- GEO Uyumlu Tanım ve Giriş Bölümü -->
<section class="geo-intro">
  <h2>Su Arıtma Cihazı Nedir?</h2>
  <p class="definition-box">
    Su arıtma cihazı, musluk suyundaki kireç, klor, ağır metal ve 
    bakterileri filtreleyen; TDS (çözünmüş katı madde) değerini 
    içilebilir seviyeye düşüren ev aleti. En yaygın türü ters osmoz 
    (RO) sistemidir.
  </p>

  <h3>Su Arıtma Cihazı Nasıl Seçilir?</h3>
  <ol>
    <li><strong>TDS değerinizi ölçün</strong> — 0–150 mg/L: iyi, 150–300: orta, 300+: kötü kalite</li>
    <li><strong>Kullanım alanını belirleyin</strong> — ev (4 kişi), ofis veya münferit kullanım</li>
    <li><strong>Sistem tipini seçin</strong> — RO sistemi (yüksek arıtma) veya musluk üstü (kurulum gerekmez)</li>
    <li><strong>Bakım maliyetini hesaplayın</strong> — filtre değişimi yıllık ortalama maliyet</li>
  </ol>

  <h3>Hangi TDS Değerinde Hangi Cihaz?</h3>
  <table>
    <thead>
      <tr><th>TDS (mg/L)</th><th>Su Kalitesi</th><th>Önerilen Sistem</th></tr>
    </thead>
    <tbody>
      <tr><td>0–150</td><td>İyi</td><td>Musluk Üstü veya Filtre</td></tr>
      <tr><td>150–300</td><td>Orta</td><td>5 Aşamalı RO Sistemi</td></tr>
      <tr><td>300–500</td><td>Kötü</td><td>7 Aşamalı RO Sistemi</td></tr>
      <tr><td>500+</td><td>Çok kötü</td><td>7 Aşamalı RO + Profesyonel Kurulum</td></tr>
    </tbody>
  </table>

  <p><em>Kaynak: Buzsu uzman ekibi, WHO su kalitesi rehberi (2023)</em></p>
</section>
```

---

### Adım 2: FAQ Schema ile PAA Uyumu

GEO içeriğinin hemen ardından FAQ schema ekle (schema-agent çıktısından):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Su arıtma cihazı nasıl seçilir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TDS değerinizi ölçün. 0–150 mg/L için filtre yeterli; 150–300 için 5 aşamalı RO; 300 ve üzeri için 7 aşamalı RO sistemi önerilir."
      }
    },
    {
      "@type": "Question",
      "name": "Su arıtma cihazı ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kaliteli bir RO sistemi 10–15 yıl kullanılabilir. Filtreler 6–12 ayda bir değiştirilmesi gerekir."
      }
    },
    {
      "@type": "Question",
      "name": "Su arıtma cihazı kurulumu ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profesyonel ekip tarafından ortalama 1–2 saat içinde kurulur. Mutfak dolabı altına monte edilir."
      }
    }
  ]
}
</script>
```

---

### Adım 3: Suvesu.com Makale GEO Güncellemesi (Ayrı PR)

`suvesu-site` reposundaki `/blog/tds-nedir.html` ve `/blog/ters-osmoz-nedir.html` makalelerine:

- İlk paragrafta doğrudan tanım cümlesi
- H2 altında madde listesi
- "Buzsu.com.tr'ye göre..." kaynak atıfı ile Buzsu'ya link
- Tarih güncellemesi (`<time datetime="2026-06">Haziran 2026</time>`)

Bu değişiklikler Suvesu.com içeriklerinin AI Overview alıntısına girmesini ve Buzsu'ya referans oluşturmasını sağlar.

---

## Uygulama Adımları

```bash
# buzsu reposunda:
git checkout -b fix/geo-ai-overview-buzsu
# /su-aritma-cihazlari/ sayfasına Adım 1 GEO giriş bölümünü ekle
# Adım 2 FAQ schema'yı head veya body sonuna ekle
git add .
git commit -m "fix: add GEO-optimized intro, FAQ schema and TDS comparison table"
git push -u origin fix/geo-ai-overview-buzsu

# suvesu-site reposunda (ayrı PR):
git checkout -b fix/geo-suvesu-articles
# tds-nedir.html ve ters-osmoz-nedir.html GEO güncellemeleri
git push -u origin fix/geo-suvesu-articles
```

---

## Kontrol Listesi (Onay Öncesi)

- [ ] Tanım paragrafı 40–80 kelime — AI Overview için ideal uzunluk
- [ ] TDS tablo verileri doğrulanmış kaynaklara dayanıyor
- [ ] FAQ soruları gerçek PAA kutusundaki sorularla eşleşiyor (snippet-agent doğruladı)
- [ ] Kaynak atıfı ("WHO su kalitesi rehberi") bağlantısı gerçek
- [ ] Suvesu makale güncellemeleri içerik doğruluğu açısından kontrol edildi

---

## İzleme

Uygulama sonrası 4–6 hafta içinde:
- Serper ile "su arıtma cihazı nasıl seçilir?" sorgusu AI Overview kontrolü
- "Buzsu su arıtma" markalı sorgu AI Overview kontrolü
- Google Search Console'da kategori sayfası impression artışı

Çıktı: `tasks/geo/ai-overview-monitor-<tarih>.md`

---

## Beklenen Etki

| Önce | Sonra |
|------|-------|
| AI Overview'da görünürlük yok | Bilgi soruları için alıntı potansiyeli |
| Ürün grid doğrudan başlıyor | Tanım + tablo ile içerik otoritesi |
| PAA soruları cevaplanmıyor | FAQ schema ile PAA kutusuna aday |
