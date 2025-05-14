const AboutHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Hakkımızda
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
              İlim, Ahlak, Teknolojiyle Geleceği İnşa Et.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ABİM olarak “İlim, Ahlak ve Teknoloji” ilkesiyle yola çıkan bir
              ekibiz. Amacımız, her yaştan bireye ulaşarak ücretsiz teknoloji
              eğitimleri sunmak ve bilgiye erişimi kolaylaştırmaktır. Donanımlı
              çalışma ortamımızda modern bilgisayarlar, teknik ekipmanlar ve
              güçlü bir ekip ruhu ile katılımcılara yazılım, tasarım ve dijital
              beceriler kazandırıyoruz. Öğrenmeyi, paylaşmayı ve gelişmeyi esas
              alan bir yapıyla Türkiye’nin dört bir yanından gelen katılımcılara
              ilham veriyoruz.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/about/ekibimiz.webp"
              alt="Hakkımızda"
              className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-icons">
          {["💻", "📱", "🔌", "🧠", "🔧", "📡", "🖱️", "🧪", "📷"].map(
            (icon, index) => (
              <span
                key={index}
                className="absolute text-3xl opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${8 + Math.random() * 12}s linear infinite`,
                }}
              >
                {icon}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
