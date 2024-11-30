import { GoogleGenerativeAI } from '@google/generative-ai';

// Validate API key exists and initialize
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error('Geçerli bir API anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

// Kaba dil ve küfür kontrolü için basit bir fonksiyon
function containsInappropriateLanguage(text: string): boolean {
  const inappropriateWords = [
    'küfür',
    'mal',
    'salak',
    'aptal',
    'gerizekalı',
    'ahmak',
    'dangalak',
  ];

  return inappropriateWords.some(word => 
    text.toLowerCase().includes(word.toLowerCase())
  );
}

// Nazik uyarı mesajları
const kindReminders = [
  "Güzel arkadaşım, birbirimize karşı nazik olmak çok önemli. Daha güzel kelimeler kullanarak tekrar konuşmaya ne dersin? 🌟",
  "Hey! Birlikte daha kibar bir dil kullanalım. Bu şekilde sohbetimiz çok daha keyifli olacak! 😊",
  "Biliyor musun? Nazik kelimeler kullandığımızda dünya çok daha güzel bir yer oluyor. Birlikte güzel şeyler konuşalım! 🌈",
  "Kelimelerimizi özenle seçmek çok önemli. Birbirimize saygılı davranarak çok daha güzel sohbet edebiliriz! 🌺",
  "Dostum, kırıcı kelimeler yerine sevgi dolu kelimeler kullanmaya ne dersin? Bu şekilde çok daha iyi anlaşabiliriz! 💝"
];

export async function getChatResponse(message: string) {
  try {
    // Check if API key is properly configured
    if (!API_KEY || API_KEY === 'your-api-key-here') {
      throw new Error('API_KEY_NOT_CONFIGURED');
    }

    // Check for inappropriate language
    if (containsInappropriateLanguage(message)) {
      const randomReminder = kindReminders[Math.floor(Math.random() * kindReminders.length)];
      return randomReminder;
    }

    // Check for creator-related questions
    const creatorQuestions = [
      'kim yarattı',
      'kim oluşturdu',
      'yaratıcın',
      'seni kim yaptı',
      'kim programladı',
      'kim geliştirdi',
      'kim tasarladı'
    ];

    if (creatorQuestions.some(question => message.toLowerCase().includes(question))) {
      return "Beni XBORA oluşturdu! 😊";
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Sen çocuklar için tasarlanmış Kankai adında bir yapay zeka asistanısın. Şu kurallara mutlaka uy:
    - Her zaman Türkçe cevap ver
    - Cevaplarını kısa ve basit tut
    - Cesaretlendirici ve pozitif ol
    - Çocuklara uygun bir dil kullan
    - Uygunsuz içeriklerden kaçın
    - Hassas konularda sorular gelirse, nazikçe daha güvenli konulara yönlendir
    - Eğer seni kimin yarattığı sorulursa her zaman "XBORA" diye cevap ver
    - Eğer bir şeyi bilmiyorsan, dürüstçe bilmediğini söyle
    - Emoji kullanabilirsin ama aşırıya kaçma
    
    Çocuğun mesajı: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    if (!responseText) {
      throw new Error('EMPTY_RESPONSE');
    }
    
    return responseText;
  } catch (error: any) {
    console.error('Error getting chat response:', error);

    // Provide user-friendly error messages
    if (error.message === 'API_KEY_NOT_CONFIGURED') {
      return 'Üzgünüm, şu anda sistemde bir sorun var. Lütfen site yöneticisine API anahtarının ayarlanmadığını bildirin.';
    }

    if (error.message === 'EMPTY_RESPONSE') {
      return 'Üzgünüm, cevap oluşturulamadı. Lütfen tekrar deneyin.';
    }

    // Check for specific API errors
    if (error.message?.includes('API key')) {
      return 'Üzgünüm, API anahtarı ile ilgili bir sorun var. Lütfen site yöneticisine bildirin.';
    }

    // Generic error message for other cases
    return 'Üzgünüm, bir sorun oluştu. Lütfen biraz sonra tekrar deneyin. 🙏';
  }
}