# Playbook: n8n Otomasyon Kurulumu

İlgili skill'ler: `skills/n8n/`, `skills/mcp/`, `skills/github/`

## Adımlar

1. **Süreç onayı** — otomatikleştirilecek akış (örn. WhatsApp lead → Airtable) insan ile
   netleştirilir (MAJOR: dış sistem yazma bağlantısı).
2. **Dokümantasyon-önce** (`skills/n8n/`) — `knowledge/n8n-workflow-process.md`'deki 7 adımlık
   süreç izlenir: SDK referansı → best practice → node keşfi → tip tanımı → spot-check →
   tam doğrulama.
3. **MCP entegrasyon kontrolü** (`skills/mcp/`) — hangi MCP server'ların workflow içinde
   kullanılacağı, kimlik bilgisi yönetimi (env var, asla dosyaya yazılmaz).
4. **Versiyon kontrolü** (`skills/github/`) — workflow tanımı/dokümantasyonu varsa branch +
   PR taslağı olarak hazırlanır.
5. **Test** — workflow yalnızca test modunda çalıştırılır; production'a **insan onayı
   olmadan publish edilmez** (CLAUDE.md madde 1 ve n8n-mcp'nin "never edit production
   workflows directly" kuralı).

## Sınır

Bu playbook hiçbir adımda gerçek n8n workflow'unu çalıştırmaz/yayınlamaz; yalnızca taslak ve
doğrulama adımlarını tarif eder.
