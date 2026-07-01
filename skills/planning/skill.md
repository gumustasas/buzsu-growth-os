---
name: planning
description: Belirsiz veya çok adımlı BUZSU görevlerini doğrulanabilir alt adımlara ayır, varsayımları aç, başarı kriterini tanımla — kodlamadan önce.
---

# Planning

## Ne Zaman Devreye Girer

- Görev 3+ farklı sistemle (CI3.7.1, Next.js, Airtable, n8n) etkileşim içerdiğinde.
- "Nasıl yapmalıyım?", "ne yapmalıyım?", "nereden başlamalıyım?" içeren her görevde.
- Tahmin süresi belirsiz veya birden fazla yaklaşım mümkün olduğunda.
- Herhangi bir MAJOR değişiklikten önce.

## Temel Pratikler

- **Varsayımları aç** — "X mevcut" gibi bir varsayım varsa ve doğrulanmadıysa listele.
- **Alt adımlara ayır** — her adım tek başına doğrulanabilir olmalı.
- **Başarı kriterini somutlaştır** — "çalışıyor" değil; "Airtable'da yeni kayıt görünüyor",
  "terminal 200 döndürüyor" gibi somut.
- **CLAUDE.md sınıfını belirle** — her alt adım SAFE PATCH mi, MINOR mi, MAJOR mı?
- **Planı önce sun, onay bekle** — MAJOR adım varsa kodlamaya geçme.

## Sınır

Plan, uygulama değildir. Plan taslağı `/drafts/` veya `/tasks/` altına yazılır.
