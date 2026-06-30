# E-ticaret / Agentic Commerce — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/commerce/` altında oluştur.
2. Airtable Products tablosundan salt okunur veri çek; yazma işlemi yapma.
3. Ürün karşılaştırma/öneri çıktısını `drafts/workflows/` altına yaz.
4. WhatsApp handoff linkini oluştururken telefon/PII bilgisini draft dosyasına yazma (CLAUDE.md güvenlik kuralı).
5. Görev sonu JSON raporu `tasks/commerce/<görev-id>.md` dosyasına eklenir.

## Sınır / Onay Notu

KESİN SINIR: ödeme veya sipariş tamamlama YAPILAMAZ. Yeni dış sistem yazma bağlantısı (ödeme entegrasyonu vb.) MAJOR sınıf, ayrıca yasak liste kapsamında.

## İlgili Dosyalar

- İlgili agent tanımı: `agents/commerce-agent.md (mevcut)`
- Bu modülün kontrol listesi: `skills/ecommerce/checklist.md`
- Örnek promptlar: `skills/ecommerce/prompts.md`
