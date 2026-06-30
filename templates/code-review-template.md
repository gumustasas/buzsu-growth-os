# Kod İnceleme Şablonu

## Kullanım

PR incelemesi veya taslak kod değerlendirmesi için bu şablonu kullan.
`skills/coding/` ve `skills/refactoring/` rehber.

---

## Genel Bilgi

- **PR/Görev**: <başlık veya task ID>
- **Değiştirilen Dosyalar**: <liste>
- **Sınıf**: [ ] SAFE PATCH [ ] MINOR [ ] MAJOR

## Gözden Geçirme Kriterleri

### Doğruluk

- [ ] Mantık hatası var mı?
- [ ] Edge case'ler ele alındı mı?
- [ ] Hata yönetimi uygun mu?

### Güvenlik

- [ ] SQL injection riski? (Query Builder kullanıldı mı?)
- [ ] Kimlik bilgisi/token hardcode edilmiş mi?
- [ ] Kullanıcı girdisi sanitize edildi mi?
- [ ] CSRF koruması aktif mi? (CI4 form submit)

### Performans

- [ ] N+1 sorgu var mı?
- [ ] Gereksiz client-side JavaScript var mı?
- [ ] Görsel optimize edilmiş mi?

### BUZSU Kuralları

- [ ] CLAUDE.md sınıflandırması doğru mu?
- [ ] Yeni bağımlılık eklendi mi? → MAJOR kontrolü
- [ ] PII veri repoya commit edilmedi mi?

## Bulgular

| Dosya | Satır | Önem | Bulgu | Öneri |
|---|---|---|---|---|
| | | Kritik/Orta/Düşük | | |

## Sonuç

[ ] Onaylandı  [ ] Revizyon gerekli  [ ] Bloklanmış (kritik bulgu)

**Notlar**: <serbest metin>
