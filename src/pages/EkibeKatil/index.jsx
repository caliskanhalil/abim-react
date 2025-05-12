import React, { useState } from "react";

const EkibeKatil = () => {
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    alan: "",
    email: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true, error: null });

    try {
      // API çağrısı yapılıyor
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.ad} ${formData.soyad}`,
          email: formData.email,
          phone: formData.telefon,
          type: "team-join",
          area: formData.alan,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Form gönderilirken bir hata oluştu");
      }

      setFormStatus({ submitted: true, loading: false, error: null });
    } catch (error) {
      console.error("Form gönderim hatası:", error);
      setFormStatus({
        submitted: false,
        loading: false,
        error: error.message || "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };

  // Form gönderildikten sonra teşekkür mesajı
  if (formStatus.submitted) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto mt-10 transform transition-all duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Başvurunuz Alındı!
          </h3>
          <p className="text-gray-600 mb-6">
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <button
            onClick={() =>
              setFormStatus({ submitted: false, loading: false, error: null })
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Yeni Başvuru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full transform transition-all duration-500 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-600">Ekibe Katıl</h2>
          <p className="mt-2 text-gray-500">
            Aramıza katılmak için formu doldurun
          </p>
        </div>

        {formStatus.error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{formStatus.error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Adınız
              </label>
              <input
                id="ad"
                name="ad"
                type="text"
                value={formData.ad}
                onChange={handleChange}
                placeholder="Adınızı girin"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Soyadınız
              </label>
              <input
                id="soyad"
                name="soyad"
                type="text"
                value={formData.soyad}
                onChange={handleChange}
                placeholder="Soyadınızı girin"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                E-posta Adresiniz
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresinizi girin"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                İletişim Numaranız
              </label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                value={formData.telefon}
                onChange={handleChange}
                placeholder="Telefon numaranızı girin"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Hangi Alanda Katılmak İstiyorsunuz?
              </label>
              <select
                id="alan"
                name="alan"
                value={formData.alan}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Seçiniz
                </option>
                <option value="tasarim">Tasarım</option>
                <option value="yazilim">Yazılım</option>
                <option value="sosyal-medya">Sosyal Medya</option>
                <option value="organizasyon">Eğitim Koordinatörü</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={formStatus.loading}
              className="w-full py-3 px-4 rounded-md bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {formStatus.loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Gönderiliyor...
                </span>
              ) : (
                "Gönder"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EkibeKatil;
