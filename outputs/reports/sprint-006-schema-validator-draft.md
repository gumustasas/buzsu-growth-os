# Sprint-006 Raporu — Schema Validator Draft Workflow

**Tarih:** 2026-06-30  
**Sprint:** Sprint-6  
**Durum:** Tamamlandı — İnsan onayı / dry-run bekliyor  
**Commit:** `feat: create draft schema validator workflow`

---

## 1. Yönetici Özeti

Sprint-6 ile Growth OS'nin **ilk gerçek n8n workflow'u** inactive draft olarak oluşturuldu.  
`automation/n8n/workflows/schema-validator.md` architecture tanımından implementation-ready'e yükseltildi.  
n8n üzerinde **"Buzsu - Schema Validator - Draft"** adıyla 7 node'lu bir workflow `wiIX2PkAsVkL016P` ID'siyle canlı (ancak inactive) durumda.

**Kurallara uyum:**
- ✅ Workflow n8n'de oluşturuldu (inactive / draft)
- ❌ Workflow publish/activate edilmedi
- ❌ Airtable'a yazılmadı
- ❌ Canlı siteye dokunulmadı
- ❌ PII işlenmedi
- ✅ Manuel dry-run hazır (insan tetikler)

---

## 2. n8n Workflow Detayı

| Alan | Değer |
|------|-------|
| Workflow ID | `wiIX2PkAsVkL016P` |
| Workflow Adı | Buzsu - Schema Validator - Draft |
| Proje | Buzsu — gumustasas@gmail.com (personal) |
| Durum | **Inactive** (published değil) |
| Node sayısı | 7 |
| Trigger tipi | Manual Trigger |

---

## 3. Node Mimarisi

```
[Manual Trigger]
      ↓
[Set Target URLs]           ← Code node; 4 item üretir (url + label)
      ↓
[Fetch Page HTML]           ← HTTP GET; responseFormat: text; neverError: true; timeout: 15s
      ↓
[Extract and Validate JSON-LD]  ← Code node (runOnceForAllItems)
                                   • HTML → <script type="application/ld+json"> parse
                                   • foundTypes vs REQUIRED_TYPES diff
                                   • 1 summary item döndürür
      ↓
[All Schemas Valid?]        ← IF node; expression: ={{ $json.summary.allPassed === true }}; op: is true
    ↓               ↓
[Validation       [Schema Errors
 Passed]           Detected]
(Set node)        (Stop and Error)
```

---

## 4. Doğrulanan Schema Tipleri

```
REQUIRED_TYPES = [
  'Product',
  'ItemList',
  'BreadcrumbList',
  'FAQPage',
  'Organization',
  'CollectionPage'
]
```

---

## 5. Hedef URL'ler

| URL | Etiket |
|-----|--------|
| `https://www.buzsu.com.tr/su-aritma-cihazlari/` | Ana Kategori |
| `https://www.buzsu.com.tr/en-iyi-su-aritma-cihazi-hangisi/` | Rehber |
| `https://www.buzsu.com.tr/ev-tipi-su-aritma-cihazlari/` | Ev Tipi |
| `https://www.buzsu.com.tr/manyetik-kirec-onleyici/` | Manyetik |

---

## 6. Çıktı Formatı

Her çalışmada workflow 1 item döndürür:

```json
{
  "summary": {
    "totalUrls": 4,
    "totalPassed": 0,
    "totalFailed": 4,
    "allPassed": false,
    "requiredTypes": ["Product", "ItemList", "BreadcrumbList", "FAQPage", "Organization", "CollectionPage"],
    "checkedAt": "2026-06-30T09:00:00.000Z"
  },
  "results": [
    {
      "url": "https://www.buzsu.com.tr/su-aritma-cihazlari/",
      "label": "Ana Kategori",
      "schemasFound": 3,
      "foundTypes": ["Organization", "BreadcrumbList", "CollectionPage"],
      "missingTypes": ["Product", "ItemList", "FAQPage"],
      "passed": false
    }
  ]
}
```

> Not: Buzsu.com.tr, bot isteklerinde 403 dönebilir. `neverError: true` ile workflow 403'te durmaz; `data` alanı boş kalır, tüm tipler "missing" raporlanır. Bu beklenen bir bekleme durumudur, hata değildir.

---

## 7. SDK Doğrulama Adımları

| Adım | Sonuç |
|------|-------|
| `get_sdk_reference` okundu | ✅ |
| `get_workflow_best_practices` (monitoring) | ✅ (döküman yok, genel n8n bilgisi) |
| `search_nodes` (6 tip) | ✅ |
| `get_node_types` (6 node tipi) | ✅ |
| `validate_node_config` (HTTP Request, IF, Stop and Error) | ✅ Tüm geçerli |
| `validate_workflow` (7 node) | ✅ valid: true |
| `create_workflow_from_code` | ✅ ID: wiIX2PkAsVkL016P |

---

## 8. Açık Blockerlar

| Blocker | Etki | Sonraki adım |
|---------|------|--------------|
| Workflow inactive (published değil) | Çalışmaz | İnsan → n8n'de "Test Workflow" ile dry-run |
| HTTP 403 olasılığı (Buzsu bot engeli) | `data` boş → tüm tipler missing | İnsan → User-Agent header ekleyebilir |
| Dashboard webhook yok | Sonuçlar n8n içinde kalır | Sprint-7: dashboard-refresh ile entegrasyon |
| Merkezi Error Trigger yok | Hata sessiz | Sprint-7: error-trigger workflow tanımı |
| whatsapp-lead staging | P0 — Sprint-6 hedefi kaldı | İnsan onayı gerekli |

---

## 9. Sonraki Sprint Önerisi (Sprint-7)

| Öncelik | Görev |
|---------|-------|
| P0 | whatsapp-lead n8n staging'de oluştur + dry-run (insan onayı) |
| P0 | schema-validator dry-run (insan → n8n'de "Test Workflow") |
| P1 | schema-validator → Schedule Trigger (günlük 06:00) production upgrade |
| P1 | Merkezi Error Trigger workflow tanımı + n8n draft |
| P1 | Dashboard cache store kararı (Vercel KV / Redis) |
| P1 | `lib/` Live client implementasyonu |
| P2 | entity-indexer KG filesystem okuması (gray-matter) |
| P2 | schema-validator → Dashboard webhook entegrasyonu |

---

## 10. Değiştirilen Dosyalar

```
automation/n8n/workflows/schema-validator.md  ← Architecture → Implementation-Ready güncelleme
outputs/reports/sprint-006-schema-validator-draft.md  ← Bu rapor
ROADMAP.md  ← Sprint-6 eklendi (Faz 5.4)
README.md  ← Sprint-6 güncellendi
```

**Toplam: 4 dosya (1 yeni, 3 güncelleme)**

---

*Rapor: automation-agent — Sprint-006 — 2026-06-30*
