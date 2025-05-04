const API_BASE =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL // örn: http://localhost:5000
    : ''; // production'da /api/send doğrudan çalışır (Vercel)

export const sendEmail = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    let data = {};
    try {
      data = await response.json();
    } catch (e) {
      console.warn('Yanıt çözümlenemedi:', e);
    }

    if (!response.ok) {
      throw new Error(data.message || 'Gönderim başarısız.');
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('E-posta gönderim hatası:', error);
    throw new Error(error.message || 'Bir hata oluştu.');
  }
};
