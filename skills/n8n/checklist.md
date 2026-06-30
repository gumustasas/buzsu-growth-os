# n8n — Otomasyon İş Akışları — Kontrol Listesi

- [ ] Mevcut template kütüphanesinde benzer workflow arandı mı (sıfırdan başlamadan önce)?
- [ ] Her node'un tüm parametreleri açıkça mı yapılandırıldı (varsayılana güvenilmedi)?
- [ ] validate_node minimal ve full modda çalıştırıldı mı?
- [ ] validate_workflow ile tüm workflow doğrulandı mı (deploy öncesi)?
- [ ] IF/Switch node branch'leri (TRUE/FALSE) doğru node'a yönlendiriliyor mu?
- [ ] Workflow production'a değil, önce test/development ortamına mı uygulanıyor?
- [ ] Template kullanıldıysa kaynağa atıf yapıldı mı?
- [ ] Hata/retry mekanizması tanımlandı mı (automation/n8n/README.md'deki desenlerle uyumlu)?

## Genel BUZSU Kuralları (her zaman geçerli)

- [ ] Çıktı önce `/drafts` altına yazıldı (CLAUDE.md madde 2)
- [ ] Ürün/fiyat/sağlık iddiası abartılmadı, doğrulanabilir (CLAUDE.md madde 5)
- [ ] PII (telefon, isim, müşteri detayı) çıktıya yazılmadı (CLAUDE.md güvenlik kuralı)
- [ ] Bu modülün kapsamı dışındaki bir karar varsa ilgili agent'a görev üretildi (kendi başına karar verilmedi)
