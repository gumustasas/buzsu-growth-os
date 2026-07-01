# Kodlama Prensipleri — BUZSU Geliştirme Felsefesi

Bu doküman `multica-ai/andrej-karpathy-skills` reposunun README'sinden gözlemlenen Karpathy
ilkelerini BUZSU'nun CI3.7.1 + Next.js + PHP yığınına uyarlar. Lisans doğrulanamadı (LICENSE
dosyası bulunamadı) — kavramsal çerçeve uyarlandı, metin kopyalanmadı.

## Dört Temel Prensip

### 1. Kod yazmadan önce varsayımları aç

LLM tabanlı kodlama asistanlarının en yaygın hatası: belirsiz görevde yanlış bir yönde
ilerleme. BUZSU'da bunu önlemek için: herhangi bir kod değişikliğinde önce "anlaşılan
nedir, anlaşılmayan nedir?" kısa listesi yapılır. Özellikle:
- "Mevcut X var" gibi varsayımlar → varlığı doğrulanmadan kod yazılmaz.
- Birden fazla çözüm yolu varsa → önce seçenekler sunulur.

### 2. Basitliği seç

"İleride lazım olabilir" sezgisiyle soyutlama ekleme. BUZSU mimarisi küçük ölçekli
(500 lead/ay, 2 site). Eşik:
- 2 benzer kod bloğu → soyutlama yok.
- 3+ benzer kod bloğu → değerlendir.
- Yeni servis/bağımlılık → MAJOR, önce onay.

### 3. Cerrahi değişiklik

Görevin tam kapsamı neyse, sadece o değiştirilir. "Şu fonksiyon da iyileştirilebilir"
sezgisi görülse bile dokunulmaz — ayrı görev olarak kaydedilir. Bu prensip CLAUDE.md'deki
"insan onaysız main'e kod yazma" ve "kör öneri yapılmaz" kurallarıyla birebir örtüşür.

### 4. Doğrulanabilir hedef

Her görevin "başarı" tanımı somut çıktıyla belirlenir:
- ❌ "Çalışıyor"
- ✓ "Airtable'da yeni kayıt görünüyor"
- ✓ "Terminal 200 OK döndürüyor"
- ✓ "Lighthouse skoru 90+'ya çıktı"

## BUZSU'ya Özgü Notlar

- CI3.7.1'de her controller metodunda SQL injection önleme: Query Builder.
- Next.js'te API anahtarı client-side code'a sızmaz: `NEXT_PUBLIC_` prefix'siz değişkenler.
- n8n'de production workflow asla doğrudan düzenlenmez.
