# Skill: LLM Crawlability & llms.txt

## Amaç
Buzsu.com.tr ve Suvesu.com'un büyük dil modelleri tarafından doğru şekilde
indekslenmesi ve alıntılanması için içerik yapısını ve robot direktiflerini optimize et.

## İlgili Agent
`seo-agent`, `schema-agent`

## Kapsam
- llms.txt protokolü (site kökü AI yönlendirme dosyası)
- LLM dostu içerik yapısı: net başlıklar, kısa paragraflar, bağımsız bölümler
- AI crawler politikası: GPTBot, ClaudeBot, PerplexityBot, GoogleBot-Extended
- Markdown/JSON-LD yapısal çıktı optimizasyonu
- LLM hallüsinasyon riski yönetimi (yanlış BUZSU bilgisi tespiti)

## İncelenen Kavram Kaynakları
- llms.txt protokol önerisi (Answer.AI blog, simonwillison.net)
- OpenAI, Anthropic, Google resmi AI crawler yönergeleri

## Onay Notu
robots.txt veya site kök dosyası değişikliği MINOR sınıf; onay gerekir.
