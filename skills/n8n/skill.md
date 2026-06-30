---
name: n8n
description: Serper takibi, Airtable senkronizasyonu ve bildirim akışları için n8n workflow tasarımı.
---

# n8n — Otomasyon İş Akışları

## Ne Zaman Devreye Girer

Kullanıcı bu alanla ilgili bir görev tanımladığında (örn. "n8n ile ilgili ...") veya ilgili agent (agents/automation-agent.md (mevcut)) kendi alanı dışında bir ihtiyaç tespit edip bu skill'e referans verdiğinde.

## Temel Pratikler

- Yeni workflow'a başlamadan önce mevcut template kütüphanesinde (n8n-mcp search_templates) arama yapmak
- Node parametrelerini varsayılana bırakmamak, açıkça tüm parametreleri yapılandırmak
- validate_node → build → validate_workflow sırasını izlemek, atlamamak
- IF/Switch node'larda branch yönlendirmesini açıkça test etmek
- Production workflow'u asla doğrudan AI ile düzenlememek — önce development/test ortamı

## Sınır

n8n'e canlı/production yazma MAJOR sınıf, CLAUDE.md yasaklar listesinde ('Airtable, n8n veya Vercel'e insan onayı olmadan production yazma yapmak' yasak).

Bu skill, CLAUDE.md ve AGENTS.md'deki genel kurmalları (insan onayı, /drafts önce, kör öneri yok) geçersiz kılmaz; onları bu alana özel hale getirir.
