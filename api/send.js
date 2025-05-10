// Vercel serverless fonksiyonun ana tanımı 
export default async function handler(req, res) {
   if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const {
    name,
    email,
    phone,
    courseId,
    courseName,
    notes,
    message,
    subject,
    type, // 'contact', 'application', 'team-join'
  } = req.body;

  // Zorunlu alan kontrolleri
  if (type === 'contact') {
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'Ad, e-posta, konu ve mesaj zorunludur.' });
    }
  } else if (type === 'application') {
    if (!name || !email || !phone || !courseId) {
      return res.status(400).json({ message: 'Ad, e-posta, telefon ve kurs ID zorunludur.' });
    }
  } else if (type === 'team-join') {
    if (!name || !email || !phone || !req.body.area) {
      return res.status(400).json({ message: 'Ad, e-posta, telefon ve alan zorunludur.' });
    }
  } else {
    return res.status(400).json({ message: 'Form tipi (type) geçersiz.' });
  }

  const domain = req.headers.host ? `https://${req.headers.host}` : 'Domain alınamadı';

  try {
    const nodemailer = await import('nodemailer');

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
Yeni İletişim Mesajı

Site: ${domain}
Ad Soyad: ${name}
E-posta: ${email}
Konu: ${subject}

Mesaj:
${message}`.trim(),
          }
        : type === 'application'
        ? {
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
          }
        : {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'ABİM Ekibe Katılım Başvurusu',
            text: `
Yeni Ekibe Katılım Başvurusu

Site: ${domain}
Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone}
Alan: ${req.body.area}`.trim(),
          };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        type === 'contact'
          ? 'Mesaj başarıyla gönderildi!'
          : type === 'application'
          ? 'Başvuru başarıyla gönderildi!'
          : 'Ekibe katılım başvurusu başarıyla gönderildi!',
    });
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    res.status(500).json({ message: 'Gönderim sırasında hata oluştu.', error: error.message });
  }
}
