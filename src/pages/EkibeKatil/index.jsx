import React, { useState } from 'react';

const EkibeKatil = () => {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    telefon: '',
    alan: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form verileri:', formData);
    // Buraya formu bir veritabanına ya da API'ye gönderme kodu eklenecek
    alert('Başvurunuz alındı!');
  };

  return (
    <section className="bg-white py-16 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ekibe Katıl</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700">Adınız</label>
          <input type="text" name="ad" value={formData.ad} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Soyadınız</label>
          <input type="text" name="soyad" value={formData.soyad} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">İletişim Numaranız</label>
          <input type="text" name="telefon" value={formData.telefon} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Hangi Alanda Katılmak İstiyorsunuz?</label>
          <select name="alan" value={formData.alan} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
            <option value="">Bir alan seçin</option>
            <option value="tasarim">Tasarım</option>
            <option value="yazilim">Yazılım</option>
            <option value="sosyal-medya">Sosyal Medya</option>
            <option value="organizasyon">Organizasyon</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Gönder</button>
      </form>
    </section>
  );
};

export default EkibeKatil;
