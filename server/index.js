const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS ayarları
const allowedOrigins = ['http://localhost:5173', 'https://www.abimagd.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS hatası: Erişime izin verilmeyen bir origin.'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());

// Preflight (OPTIONS) isteği için CORS cevabı
app.options('/api/send', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

// POST /api/send → Mail gönderimi
app.post('/api/send', async (req, res) => {
  const {
    name,
    email,
    phone,
    courseId,
    courseName,
    notes,
    message,
    subject,
    type,
  } = req.body;

  // Alan doğrulama
  if (type === 'contact') {
    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: 'Ad, e-posta, konu ve mesaj zorunludur.' });
    }
  } else if (type === 'application') {
    if (!name || !email || !phone || !courseId) {
      return res.status(400).json({ message: 'Ad, e-posta, telefon ve kurs ID zorunludur.' });
    }
  } else {
    return res.status(400).json({ message: 'Form tipi (type) geçersiz.' });
  }

  const domain = req.headers.host ? `https://${req.headers.host}` : 'Domain alınamadı';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = type === 'contact'
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

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: type === 'contact'
        ? 'Mesaj başarıyla gönderildi!'
        : 'Başvuru başarıyla gönderildi!',
    });
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    res.status(500).json({ message: 'Gönderim sırasında hata oluştu.', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
