# n8n Workflow Süreci (czlonkowski/n8n-mcp'den damıtıldı)

Bu ortamda zaten aktif olan `mcp__n8n__*` araçlarının resmi kullanım sırası, n8n-mcp
README'sinde tarif edilen süreçle birebir uyumlu. Aşağıdaki adımlar bu ortamın MCP server
talimatlarıyla tutarlı hale getirilmiş özetidir (kopya değil, BUZSU bağlamına not):

1. **Dokümantasyon-önce** — `get_sdk_reference` çağrılmadan workflow kodu yazılmaz.
2. **Best-practice arama** — `get_workflow_best_practices` ile tekniğe özel rehber alınır
   (örn. "scheduling", "triage").
3. **Node keşfi** — `search_nodes` ile gereken servis/yardımcı node'lar bulunur.
4. **Tip tanımı** — `get_node_types` ile parametre adları tahmin edilmeden alınır.
5. **Spot-check** — her node `validate_node_config` ile tek tek doğrulanır.
6. **Tam doğrulama** — `validate_workflow` ile graf bütünlüğü kontrol edilir.
7. **Yayınlama** — yalnızca insan onayından sonra `publish_workflow`.

## Kritik Kural

> "NEVER edit production workflows directly with AI." — n8n-mcp README'sinin en güçlü uyarısı.
> CLAUDE.md madde 1 ve "Airtable, n8n veya Vercel'e insan onayı olmadan production yazma
> yapmak" yasağıyla birebir örtüşüyor; bu repoda otomatik production deploy/publish
> **yapılmaz**, yalnızca taslak/test workflow üretilebilir.

## BUZSU'ya Uygulama

`skills/n8n/` modülü bu süreci adım adım uygulanabilir checklist'e çevirir;
`playbooks/n8n-otomasyon-kurulum.md` ise lead-capture gibi somut bir BUZSU senaryosuna uygular.
