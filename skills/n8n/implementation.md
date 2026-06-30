# n8n — Otomasyon İş Akışları — BUZSU Uygulama Adımları

## Adımlar

1. Görev dosyasını `tasks/automation/` altında oluştur.
2. n8n-mcp araçlarıyla (search_templates, search_nodes, validate_node, validate_workflow) salt taslak üretim ve doğrulama yap.
3. Taslak workflow tanımını `drafts/workflows/` ve onaylandıktan sonra `workflows/n8n/` altına yaz.
4. n8n'e production workflow yüklenmez — JSON/YAML taslağı üretilir, insan yükler (AGENTS.md automation-agent sınırı).
5. Görev sonu JSON raporu `tasks/automation/<görev-id>.md` dosyasına eklenir.

## Sınır / Onay Notu

n8n'e canlı/production yazma MAJOR sınıf, CLAUDE.md yasaklar listesinde ('Airtable, n8n veya Vercel'e insan onayı olmadan production yazma yapmak' yasak).

## İlgili Dosyalar

- İlgili agent tanımı: `agents/automation-agent.md (mevcut)`
- Bu modülün kontrol listesi: `skills/n8n/checklist.md`
- Örnek promptlar: `skills/n8n/prompts.md`
