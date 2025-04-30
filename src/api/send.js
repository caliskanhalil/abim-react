import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: import.meta.env.VITE_EMAIL,
        pass: import.meta.env.VITE_PASSWORD,
    },
});

export const sendEmail = async (formData) => {
    try {
        const mailOptions = {
            from: import.meta.env.VITE_EMAIL,
            to: import.meta.env.VITE_EMAIL,
            subject: 'ABİM Kurs Başvurusu',
            text: `
            Yeni Kurs Başvurusu
            
            Ad Soyad: ${formData.name}
            E-posta: ${formData.email}
            Telefon: ${formData.phone}
            Kurs: ${formData.courseName}
            Kurs ID: ${formData.courseId}
            Notlar: ${formData.notes}
            `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Başvurunuz başarıyla gönderildi!' };
    } catch (error) {
        console.error('E-posta gönderim hatası:', error.message);
        throw new Error('Başvuru gönderilemedi.');
    }
}; 