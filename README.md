🍦 Drop Cream - Modern & Test Odaklı Dondurma Platformu
Bu proje, React ve Tailwind CSS kullanılarak geliştirilmiş, son kullanıcı deneyimi (UX) ile kod güvenilirliğini (Test) birleştiren profesyonel bir e-ticaret arayüzüdür. Kursun en başarılı %10'luk diliminde yer alan bir geliştirici olarak, bu çalışmada karmaşık state yönetimini ve ileri seviye test süreçlerini başarıyla uyguladım.

🚀 Öne Çıkan Özellikler
Dinamik Sepet Yönetimi: Ara toplam, %8 KDV hesaplaması ve 200₺ üzeri "Kargo Bedava" baremi gibi gerçek dünya senaryoları kurgulanmıştır.

Modern & Responsive Tasarım: Tailwind CSS ile oluşturulmuş, her cihazla uyumlu ve iştah açıcı bir kullanıcı arayüzü sunar.

Modüler Bileşen Mimarisi: Hero, List, CartButton gibi bağımsız bileşen yapısıyla sürdürülebilir ve temiz bir kod tabanı oluşturulmuştur.

Gelişmiş State Kontrolü: Redux Toolkit kullanılarak ürün miktarı ve sepet opsiyonlarının (Külah/Bardak) hatasız takibi sağlanmıştır.

🛠️ Teknik Altyapı (Tech Stack)
Ana Teknolojiler
Frontend: React 18 & Vite

Stil: Tailwind CSS

State Management: @reduxjs/toolkit & react-redux

Veri İletişimi: Axios & JSON-Server

Test & Kalite
Testing Framework: Vitest

Library: React Testing Library & Jest-DOM

Sonuç: Toplam 16/16 Başarılı Test ile uygulama mantığı doğrulanmıştır.

🛡️ Test Süreçleri ve Kalite
Test yazımı için ayrılan yoğun mesai, projenin mantıksal temellerini sağlamlaştırmıştır:

AmountPicker gibi kritik bileşenlerde miktar artış/azalış ve Redux dispatch işlemleri Unit Test ile doğrulanmıştır.

Mocking teknikleri (vi.fn(), vi.mock) kullanılarak bağımlılıklardan izole edilmiş güvenilir test senaryoları kurgulanmıştır.
```bash
⚙️ Kurulum ve Çalıştırma
Bağımlılıkları yükleyin:

Bash
npm install
API sunucusunu başlatın:

Bash
    npm run server
    ```
3.  Uygulamayı geliştirme modunda açın:
    ```bash
    npm run dev

Testleri çalıştırın:

Bash
npm run test

