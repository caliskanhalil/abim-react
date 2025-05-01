const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const sendEmail = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/api/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Bir hata oluştu');
        }

        return { success: true, message: data.message };
    } catch (error) {
        console.error('E-posta gönderim hatası:', error);
        throw new Error(error.message || 'Başvuru gönderilemedi. Lütfen daha sonra tekrar deneyin.');
    }
}; 