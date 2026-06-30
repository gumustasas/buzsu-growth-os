# Geçiş Raporu: AtlasOS → Buzsu Growth OS

**Tarih:** 2026-06-30  
**Kaynak:** `gumustasas/atlasos`  
**Hedef:** `gumustasas/buzsu-growth-os`

---

## Özet

AtlasOS'un genel amaçlı AI ajan mimarisi, Buzsu.com.tr ve Suvesu.com'un özel büyüme hedeflerine göre uyarlandı. 5 genel agent → 10 Buzsu-spesifik agent. Birebir kopyalama yapılmadı; mimari desenler alındı, içerik tamamen yeniden yazıldı.

---

## Neler Alındı (AtlasOS'tan)

| AtlasOS Konsepti | Buzsu Growth OS Karşılığı |
|-----------------|--------------------------|
| Orchestrator → Agent yönlendirme | Aynı desen; 10 Buzsu-specific agent |
| SAFE PATCH / MINOR / MAJOR sınıflandırması | CLAUDE.md'e taşındı, Buzsu bağlamına göre örneklendirildi |
| Draft → Human Approval → Output pipeline | Aynı; `docs/human-approval.md`'e detaylandırıldı |
| Agent JSON raporu formatı | Aynı format; her agent kendi görev dosyasına yazar |
| `/tasks/<alan>/` dizin yaklaşımı | Genişletildi: 7 alan (seo/geo/cro/schema/content/commerce/automation) |
| Görev sonu raporu zorunluluğu | Korundu |
| Dış sisteme yazma yasağı (insan onayı olmadan) | Korundu ve güçlendirildi |

---

## Neler Değişti (Buzsu'ya Özel Adaptasyon)

### Agent Sayısı: 5 → 10

| AtlasOS Agent | Buzsu Karşılığı | Genişletme |
|--------------|-----------------|-----------|
| seo-agent | seo-agent | Teknik SEO denetimi + Search Console yorumlama eklendi |
| content-agent | content-agent + geo-agent + snippet-agent | GEO ve snippet görevleri ayrı agent'a alındı |
| research-agent | competitor-agent + eeat-agent | Rakip ve E-E-A-T ayrıldı |
| — (yok) | cro-agent | WhatsApp CTA + A/B test hipotezi — Buzsu'ya özgü |
| — (yok) | schema-agent | Product/FAQ/HowTo markup — e-ticaret gerekliliği |
| — (yok) | commerce-agent | Agentic alışveriş + WhatsApp handoff — Buzsu'ya özgü |
| — (yok) | automation-agent | n8n + Airtable + Serper — Buzsu'ya özgü |
| report-agent | Orchestrator'a entegre | Ayrı agent değil, her agent kendi raporu üretiyor |

### Kaldırılan AtlasOS Konseptleri

- **2040-2050 evrim kuralları:** Buzsu için erken aşama bu tür spekülatif kurallar uygun değil.
- **Araştırma agent'ı (generic research):** Competitor-agent ve eeat-agent daha spesifik sorumluluklar üstlendi.
- **Generic "report-agent":** Her agent kendi JSON raporunu üretiyor; ayrı report agent gereksiz.
- **DAG-based agent orchestration:** Şimdilik manuel orchestration yeterli. Hacim arttıkça eklenebilir.

### Yeni Buzsu Konseptleri (AtlasOS'ta Yok)

| Konsept | Dosya | Açıklama |
|---------|-------|---------|
| AI Commerce Katmanı | `docs/ai-commerce-layer.md` | TDS → ürün eşleştirme, WhatsApp handoff protokolü |
| GEO (Generative Engine Optimization) | `agents/geo-agent.md` | AI Overview, Bing Copilot, ChatGPT alıntı optimizasyonu |
| Airtable CRM entegrasyonu | `airtable-schema.md` | 4 tablo, lead scoring formula, field mapping |
| Lead entry audit | `lead-entry-audit.md` | 10 entry point, kod bazlı analiz, öncelik listesi |
| P1 Patch sistemi | `patches/suvesu-site/` | Diğer repolara uygulanacak hazır yamalar |
| WhatsApp pre-fill URL protokolü | `agents/cro-agent.md`, `agents/commerce-agent.md` | Türkiye pazarına özgü |
| E-E-A-T denetim çerçevesi | `agents/eeat-agent.md` | 4 boyut, 11 sinyal kontrol listesi |

---

## Oluşturulan Dosyalar

### Kök Dizin
- `CLAUDE.md` — Buzsu-specific Claude Code kuralları
- `AGENTS.md` — 10 agent sistemi referansı
- `README.md` — Güncellendi (Buzsu mimarisi)
- `ROADMAP.md` — Buzsu büyüme yol haritası (12 faz)
- `MIGRATION_REPORT.md` — Bu dosya

### /agents/ (10 dosya)
- `seo-agent.md`
- `geo-agent.md`
- `snippet-agent.md`
- `cro-agent.md`
- `schema-agent.md`
- `eeat-agent.md`
- `content-agent.md`
- `competitor-agent.md`
- `commerce-agent.md`
- `automation-agent.md`

### /docs/ (3 dosya)
- `human-approval.md` — Onay sistemi, SAFE PATCH / MINOR / MAJOR
- `operating-model.md` — Operasyon ritmi, metrikler, koordinasyon
- `ai-commerce-layer.md` — AI Commerce protokolü, WhatsApp handoff

### /tasks/ (7 alt dizin, .gitkeep)
`seo/`, `geo/`, `cro/`, `schema/`, `content/`, `commerce/`, `automation/`

### /drafts/ (4 alt dizin, .gitkeep)
`content/`, `code/`, `schema/`, `workflows/`

### /outputs/ (4 alt dizin, .gitkeep)
`reports/`, `audits/`, `briefs/`, `recommendations/`

### /workflows/ (3 alt dizin, .gitkeep)
`n8n/`, `serper/`, `airtable/`

### /agents/ (1 boş dizin, .gitkeep)

---

## Daha Önce Oluşturulan Dosyalar (Bu Geçişten Önce)

- `airtable-schema.md` — CRM şema referansı (Faz 0)
- `lead-entry-audit.md` — Lead entry point denetimi (Faz 1)
- `patches/suvesu-site/ai-agent-field-mapping.md` — P1 fix (Faz 2)
- `patches/suvesu-site/chat.test.js` — 31 test case (Faz 2)

---

## Riskler

| Risk | Olasılık | Etki | Azaltma |
|------|---------|------|---------|
| suvesu-site P1 patch uygulanmadı | Orta | Yüksek | `patches/` altında hazır; insan uygulamalı |
| Buzsu.com.tr production'a erişim yok | Yüksek | Orta | Faz 12 önce platform tespiti yapılmalı |
| Airtable token'ı expire olursa | Düşük | Yüksek | Env var güncellemesi yeterli |
| n8n taslakları production'a yüklenmeden kalırsa | Orta | Düşük | Otomasyon kazanımı gecikir, kritik değil |

---

## Bir Sonraki Adım

**Acil (Faz 4):**
```bash
# suvesu-site reposunda:
git checkout -b fix/ai-agent-airtable-field-mapping
# patches/suvesu-site/ai-agent-field-mapping.md içindeki değişiklikleri uygula
node public_html/api/chat.test.js  # 31 test geçmeli
git push -u origin fix/ai-agent-airtable-field-mapping
# PR aç: fix/ai-agent-airtable-field-mapping → main
```

**Ardından (Faz 5):**
- `tasks/seo/` altında anahtar kelime analizi görevi başlat
- seo-agent çalıştır
