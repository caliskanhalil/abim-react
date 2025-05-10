import React from "react";
import { Link } from "react-router-dom";

const roles = [
  {
    title: "Yazılımcı",
    description: "Web ve mobil projelerde görev alacak ekip arkadaşları arıyoruz.",
    icon: "💻",
  },
  {
    title: "Tasarımcı",
    description: "UI/UX alanında yaratıcı fikirler geliştirecek gönüllüler bekliyoruz.",
    icon: "🎨",
  },
  {
    title: "Sosyal Medya Sorumlusu",
    description: "İçerik üretecek, paylaşımları yönetecek bir takım arkadaşı olabilirsin.",
    icon: "📱",
  },
  {
    title: "Eğitim Koordinatörü",
    description: "Eğitim planlaması ve iletişim süreçlerinde aktif rol alabilirsin.",
    icon: "📚",
  },
];

const JoinUs = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-20 px-6 md:px-12 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
          Ekibimize Katıl, Geleceği Birlikte Şekillendirelim!
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Gençliğe hizmet eden bu güzel ekipte senin de yerin var. Hemen bize ulaş, birlikte daha güçlü olalım!
        </p>
        <Link
  to="/ekibe-katil"
  className="inline-block bg-blue-600 text-white text-lg px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
>
  Hemen Başvur
</Link>
      </div>

      {/* Kartlar */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {roles.map((role, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{role.icon}</div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{role.title}</h3>
            <p className="text-gray-600 text-sm">{role.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinUs;
