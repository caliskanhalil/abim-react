import { FaYoutube, FaPlay } from 'react-icons/fa';

const videos = [
  {
    id: 1,
    title: "Yazılım Geliştirme Süreci",
    description: "Modern yazılım geliştirme süreçleri ve best practice'ler hakkında detaylı bir video.",
    thumbnail: "/banner.jpg",
    url: "https://youtube.com/watch?v=example1"
  },
  {
    id: 2,
    title: "Web Teknolojileri",
    description: "Frontend ve backend teknolojileri hakkında kapsamlı bir anlatım.",
    thumbnail: "/slider-2.png",
    url: "https://youtube.com/watch?v=example2"
  },
  {
    id: 3,
    title: "Mobil Uygulama Geliştirme",
    description: "iOS ve Android için mobil uygulama geliştirme temelleri.",
    thumbnail: "/slider-3.jpg",
    url: "https://youtube.com/watch?v=example3"
  },
  {
    id: 4,
    title: "Veri Bilimi ve Yapay Zeka",
    description: "Veri bilimi ve yapay zeka uygulamaları hakkında bilgilendirici içerik.",
    thumbnail: "/banner.jpg",
    url: "https://youtube.com/watch?v=example4"
  }
];

const YouTubeSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaYoutube className="text-4xl text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold">
              YouTube Kanalımız
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Eğitim videolarımız ve teknoloji içeriklerimiz için YouTube kanalımızı takip edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <a 
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {video.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://youtube.com/@channel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaYoutube className="text-xl" />
            Kanalımıza Abone Olun
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection; 