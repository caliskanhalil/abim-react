import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be implemented here
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Helmet>
        <title>İletişim - ABİM Adana Anadolu Gençlik Derneği</title>
        <meta name="description" content="Adana Anadolu Gençlik Derneği ile iletişime geçin. Adres: Türkocağı, 24014. Sk. No:2, 01020 Seyhan/Adana" />
        <meta name="keywords" content="ABİM iletişim, Adana Gençlik Derneği iletişim, AGD Adana iletişim" />
        <meta property="og:title" content="İletişim - ABİM Adana Anadolu Gençlik Derneği" />
        <meta property="og:description" content="Adana Anadolu Gençlik Derneği ile iletişime geçin. Sorularınız ve önerileriniz için bize ulaşın." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.abimagd.com/iletisim" />
        <meta property="og:image" content="https://www.abimagd.com/contact-og-image.jpg" />
        <link rel="canonical" href="https://www.abimagd.com/iletisim" />
      </Helmet>
      <div className="pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">İletişime Geçin</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sorularınız veya işbirliği talepleriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">İletişim Bilgileri</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Telefon</p>
                    <p className="text-gray-800 font-medium">+90 (555) 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">E-posta</p>
                    <p className="text-gray-800 font-medium">info@abim.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600">Adres</p>
                    <p className="text-gray-800 font-medium">Türkocağı, 24014. Sk. No:2</p>
                    <p className="text-gray-800 font-medium">01020 Seyhan/Adana</p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-gray-600 mb-4">Sosyal Medya</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
                      <FaFacebook className="text-blue-600 text-xl" />
                    </a>
                    <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
                      <FaTwitter className="text-blue-600 text-xl" />
                    </a>
                    <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
                      <FaInstagram className="text-blue-600 text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mesaj Gönderin</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Mesaj Gönder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Konum</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.8950419533785!2d35.33155!3d36.982291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288f8b2d25c5e3%3A0x5d5c731b8f8b8f1a!2sAnadolu%20Gen%C3%A7lik%20Derne%C4%9Fi%20Adana%20%C5%9Eubesi!5e0!3m2!1str!2str!4v1647951661026!5m2!1str!2str"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

