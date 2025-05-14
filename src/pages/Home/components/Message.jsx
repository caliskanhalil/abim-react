const Message = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 lg:w-5/12">
          <img
            src="/ERBAKAN.webp"
            alt="Necmettin Erbakan"
            className="rounded-lg shadow-xl w-full max-w-2xl mx-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="md:w-1/2 lg:w-7/12 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Sevgili Gençler!
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            "Sizlerden bir şey istiyorum. Heyecan, heyecan, heyecan. Neyin
            heyecanını istiyorum biliyor musunuz? Varoşlarda yaşayıp, şehirlerin
            kenarlarındaki çöplüklerden, evine yiyecek toplayan çocukları
            kurtarmanın heyecanını istiyorum."
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            "Sizler, geleceğimizin mimarlarısınız. Her biriniz, bu ülkenin
            yarınları için çok değerlisiniz. Kendinizi sürekli geliştirin,
            okuyun, araştırın ve asla pes etmeyin."
          </p>
          <a
            href="https://www.youtube.com/watch?v=xKbGRCOyIqA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Necmettin Erbakan'dan Mesajınız Var!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Message;
