# Oturumlar Arası Hafıza Mimarisi Desenleri

thedotmack/claude-mem (Apache 2.0) repo README'sinden gözlemlenen desen: Claude Code
oturumları arasında bağlamı kaybetmemek için konuşma özetlerinin/kararlarının yapılandırılmış
şekilde dışarıda saklanması ve bir sonraki oturumun başında geri yüklenmesi.

## BUZSU'ya Uyarlanan Kısım

- Kod/araç bütünleştirmesi (claude-mem'in MCP server'ı) **alınmadı** — BUZSU'nun zaten
  `/tasks/<alan>/<görev-id>.md` dosyalarında JSON görev-sonu raporu tutan kendi mekanizması var
  (AGENTS.md formatı). Yeni bir hafıza servisi eklemek MAJOR sınıf (yeni bağımlılık/servis).
- Alınan kısım yalnızca **desen**: her görev dosyasının sonunda yapılandırılmış özet
  tutulması, böylece yeni bir oturum o dosyayı okuyarak bağlamı geri kazanabilir.
  `skills/memory/` bu deseni BUZSU'nun mevcut `/tasks/` yapısına uygulanabilir hale getirir.

## Sınır

Harici bir hafıza/vektör veritabanı servisi önerilmiyor; mevcut dosya-tabanlı görev kaydı
yeterli kabul edildi (architecture.md'deki "Need ML lead scoring" karşı-varsayımına paralel
mantık: basit dosya tabanlı kayıt, küçük ölçekte karmaşık sistemden daha güvenilir).
