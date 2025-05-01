import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, courseId, courseName, notes, message, subject, type } = req.body;

  // Gerekli alanları kontrol et
  if (type === 'contact') {
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'Ad, e-posta, konu ve mesaj zorunludur.' });
    }
  } else {
    if (!name || !email || !phone || !courseId) {
      return res.status(400).json({ message: 'Ad, e-posta, telefon ve kurs ID zorunludur.' });
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions =
      type === 'contact'
        ? {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `ABİM İletişim Formu - ${subject}`,
            text: `
Yeni İletişim Formu Mesajı

Ad Soyad: ${name}
E-posta: ${email}
Konu: ${subject}

Mesaj:
${message}
            `.trim(),
          }
        : {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'ABİM Kurs Başvurusu',
            text: `
Yeni Kurs Başvurusu

Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone}
Kurs: ${courseName}
Kurs ID: ${courseId}
Notlar: ${notes}
            `.trim(),
          };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: type === 'contact' ? 'Mesaj başarıyla gönderildi!' : 'Başvuru başarıyla gönderildi!',
    });
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    res.status(500).json({ message: 'Gönderim sırasında hata oluştu.', error: error.message });
  }
}
