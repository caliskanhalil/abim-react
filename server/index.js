const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS ayarları
app.use(cors({
    origin: 'http://localhost:5173', // React uygulamasının çalıştığı port
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

app.use(express.json());

// OPTIONS isteği için yanıt
app.options('/api/send', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

// Mail gönderme endpoint'i
app.post('/api/send', async (req, res) => {
    const { name, email, phone, courseId, courseName, notes, message, subject, type } = req.body;

    if (type === 'contact') {
        if (!name || !email || !message || !subject) {
            return res.status(400).json({
                message: 'Lütfen tüm gerekli alanları doldurun (Ad Soyad, E-posta, Konu ve Mesaj).',
                error: 'Missing required fields'
            });
        }
    } else {
        if (!name || !email || !phone || !courseId) {
            return res.status(400).json({
                message: 'Lütfen tüm gerekli alanları doldurun.',
                error: 'Missing required fields'
            });
        }
    }

    try {
        if (!process.env.EMAIL || !process.env.PASSWORD) {
            throw new Error('Mail ayarları eksik!');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        let mailOptions = {};

        if (type === 'contact') {
            mailOptions = {
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
          `.trim()
            };
        } else {
            mailOptions = {
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
          `.trim()
            };
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: type === 'contact' ? 'Mesajınız başarıyla gönderildi!' : 'Başvurunuz başarıyla gönderildi!' });
    } catch (error) {
        console.error('E-posta gönderim hatası:', error);
        res.status(500).json({
            message: type === 'contact' ? 'Mesaj gönderilemedi.' : 'Başvuru gönderilemedi.',
            error: error.message
        });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);

    // Mail ayarlarını kontrol et
    console.log('Mail Ayarları:', {
        email: process.env.EMAIL ? 'Ayarlanmış' : 'Eksik',
        password: process.env.PASSWORD ? 'Ayarlanmış' : 'Eksik',
        passwordLength: process.env.PASSWORD ? process.env.PASSWORD.length : 0
    });
}); 