import { useState } from "react";

const galleryData = [
  {
    id: 1,
    title: "Ekibimiz",
    text: "Ekibimiz teknoloji tutkusu ile yola çıktı.",
    image: "/about/ekibimiz.webp",
  },

  {
    id: 2,
    title: "Çalışma Ortamımız",
    text: "Çalışma ortamımızdan kareler.",
    image: "/about/ortam.webp",
  },
  {
    id: 3,
    title: "Eğitimlerimiz",
    text: "Modern ekipmanlarımız ile eğitim veriyoruz.",
    image: "/about/eğitimlerimiz.webp",
  },
  {
    id: 4,
    title: "Sosyal Medyamız",
    text: "Sosyal medya içeriklerimizden bazı örnekler.",
    image: "/about/sosyal-medyamız.webp",
  },
  {
    id: 5,
    title: "Etkinliklerimiz",
    text: "Katıldığımız etkinliklerden kareler.",
    image: "/about/etkinliklerimiz.webp",
  },
  {
    id: 6,
    title: "Röportajlarımız",
    text: "Teknofest röportajlarımızdan kareler",
    image: "/about/röportajlarımız.webp",
  },
  {
    id: 7,
    title: "Seminerlerimiz",
    text: "Verdiğimiz seminerlerden görüntüler.",
    image: "/about/seminerlerimiz.webp",
  },
  {
    id: 8,
    title: "Projelerimiz",
    text: "Her gün yeni projeler geliştiriyoruz.",
    image: "/about/abim-logo.png",
  },
  {
    id: 9,
    title: "İlk Ofis",
    text: "Adana'daki ilk ofisimizden bir kare.",
    image: "/about/ilk-ofis.webp",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Bizden Kareler
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.text}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
