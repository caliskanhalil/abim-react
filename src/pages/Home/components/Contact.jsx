import { useState } from 'react';
import { sendEmail } from '../../../utils/sendEmail';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

const Contact = ({ showContactInfo = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        type: 'contact',
      });

      setSuccess(
        'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
      );
      resetForm();
    } catch (error) {
      setError(
        error.message ||
          'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            İletişime Geçin
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sorularınız veya işbirliği talepleriniz için bize ulaşın. En kısa
            sürede size dönüş yapacağız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showContactInfo && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  İletişim Bilgileri
                </h2>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Telefon</p>
                    <p className="text-gray-800 font-medium">
                      +90 (536) 715 41 11
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">E-posta</p>
                    <p className="text-gray-800 font-medium">
                      info.abimagd@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Adres</p>
                    <p className="text-gray-800 font-medium">
                      Türkocağı, 24014. Sk. No:2
                    </p>
                    <p className="text-gray-800 font-medium">
                      01020 Seyhan/Adana
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-gray-600 mb-4">Sosyal Medya</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/abimagd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      <FaInstagram className="text-blue-600 text-xl" />
                    </a>
                    <a
                      href="https://www.youtube.com/@abimagd/featured"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      <FaYoutube className="text-blue-600 text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={showContactInfo ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Mesaj Gönderin
              </h2>

              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
