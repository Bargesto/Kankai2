# KidChat AI - Çocuklar için AI Sohbet Uygulaması

## Yayınlama Seçenekleri

### Seçenek 1: Vercel ile Yayınlama (Önerilen)

1. https://vercel.com adresinden bir Vercel hesabı oluşturun
2. Vercel CLI'ı yükleyin:
   ```bash
   npm install -g vercel
   ```
3. Proje klasörünüzde şu komutu çalıştırın:
   ```bash
   vercel
   ```
4. Karşınıza çıkan yönergeleri takip edin
5. Yayınlama tamamlandığında size bir URL verilecek

### Seçenek 2: Netlify ile Yayınlama

1. https://netlify.com adresinden bir Netlify hesabı oluşturun
2. Netlify CLI'ı yükleyin:
   ```bash
   npm install -g netlify-cli
   ```
3. Projeyi derleyin:
   ```bash
   npm run build
   ```
4. Netlify ile yayınlayın:
   ```bash
   netlify deploy
   ```

### Seçenek 3: Manuel Yayınlama

1. Projeyi derleyin:
   ```bash
   npm run build
   ```
2. `dist` klasörü içinde derlenmiş uygulamanız hazır olacak
3. Bu klasörün içeriğini herhangi bir statik hosting servisine yükleyin

## Gerekli Ortam Değişkenleri

Yayınlama platformunuzda aşağıdaki ortam değişkenini ayarlamayı unutmayın:

- `VITE_GEMINI_API_KEY`: Google Gemini AI API anahtarınız

## Yayınlama Sonrası Kontrol Listesi

Yayınlama tamamlandıktan sonra şunları kontrol edin:

1. Uygulamanın genel olarak çalışıp çalışmadığını test edin
2. AI sohbet özelliğinin düzgün çalıştığından emin olun
3. Metin-ses dönüşümünün çalıştığını kontrol edin
4. Tüm görsellerin doğru yüklendiğinden emin olun

## Hata Durumunda

Yayınlama sırasında sorun yaşarsanız:
- Vercel Dökümanları: https://vercel.com/docs
- Netlify Dökümanları: https://docs.netlify.com

## Önemli Notlar

1. API anahtarınızı güvenli bir şekilde saklamayı unutmayın
2. HTTPS kullanıldığından emin olun
3. Düzenli olarak yedek alın
4. Performans izlemesi yapın

Sorularınız için Github Issues üzerinden destek alabilirsiniz.