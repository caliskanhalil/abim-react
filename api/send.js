// Vercel serverless fonksiyonun ana tanımı 
export default async function handler(req, res) {
  // Sadece POST metodu kabul edilir
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // İstek gövdesinden gelen veriler destructure edilir
  const {
    name,
    email,
    phone,
    courseId,
    courseName,
    notes,
    message,
    subject,
    type, // Buradaki type = 'contact' veya 'application'
  } = req.body;

  // Eğer iletişim formuysa, bu alanlar zorunlu
  if (type === 'contact') {
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'Ad, e-posta, konu ve mesaj zorunludur.' });
    }
  }
  // Eğer başvuru formuysa, bu alanlar zorunlu
  else if (type === 'application') {
    if (!name || !email || !phone || !courseId) {
      return res.status(400).json({ message: 'Ad, e-posta, telefon ve kurs ID zorunludur.' });
    }
  }
  // Form tipi tanınmıyorsa hata döner
  else {
    return res.status(400).json({ message: 'Form tipi (type) geçersiz.' });
  }

  // Mail içinde kullanılacak domain bilgisi (gelen isteğe göre otomatik alınır)
  const domain = req.headers.host ? `https://${req.headers.host}` : 'Domain alınamadı';

  try {
    // Nodemailer'ı dinamik import (ESM uyumlu)
    const nodemailer = await import('nodemailer');

    // Gmail servis sağlayıcısı ile transporter oluşturuluyor
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,     // Gmail adresi
        pass: process.env.PASSWORD,  // Gmail uygulama şifresi
      },
    });

    // Form tipi 'contact' ise şu mail içeriği hazırlanır:
    const mailOptions =
      type === 'contact'
        ? {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `ABİM İletişim Formu - ${subject}`,
            text: `
Yeni İletişim Mesajı

Site: ${domain}
Ad Soyad: ${name}
E-posta: ${email}
Konu: ${subject}

Mesaj:
${message}`.trim(),
          }
        // Form tipi 'application' ise şu mail içeriği hazırlanır:
        : {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'ABİM Kurs Başvurusu',
            text: `
Yeni Kurs Başvurusu

Site: ${domain}
Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone}
Kurs: ${courseName}
Kurs ID: ${courseId}
Notlar: ${notes || '-'}`.trim(),
          };

    // E-posta gönderme işlemi
    await transporter.sendMail(mailOptions);

    // Başarılı yanıt mesajı
    res.status(200).json({
      message: type === 'contact'
        ? 'Mesaj başarıyla gönderildi!'
        : 'Başvuru başarıyla gönderildi!',
    });
  } catch (error) {
    // Hata varsa hem loglanır hem de client’a bildirilir
    console.error('Mail gönderim hatası:', error);
    res.status(500).json({ message: 'Gönderim sırasında hata oluştu.', error: error.message });
  }
}
