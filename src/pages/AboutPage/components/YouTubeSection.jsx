// src/components/YouTubeSection.jsx
import { FaYoutube, FaPlay } from 'react-icons/fa';
import videos from './youtubeData';

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
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@abimagd"
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
