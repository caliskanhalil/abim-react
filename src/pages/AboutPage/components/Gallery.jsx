import { useState } from 'react';

const galleryData = [
  {
    id: 1,
    title: "Kurucularımız",
    text: "Kurucularımız teknoloji tutkusu ile yola çıktı.",
    image: "/banner.png"
  },
  {
    id: 2,
    title: "İlk Ofisimiz",
    text: "İstanbul'daki ilk ofisimizden bir manzara.",
    image: "/banner.png"
  },
  {
    id: 3,
    title: "Ekibimiz",
    text: "Ekip üyelerimizden biri çalışırken.",
   image: "/banner.png"
  },
  {
    id: 4,
    title: "Eğitimlerimiz",
    text: "Modern ekipmanlarımız ile eğitim veriyoruz.",
     image: "/banner.png"
  },
  {
    id: 5,
    title: "Projelerimiz",
    text: "Her gün yeni projeler geliştiriyoruz.",
    image: "/man-1.jpg"
  },
  {
    id: 6,
    title: "Çalışma Ortamımız",
    text: "Bitkilerle dolu yaratıcı bir ofis ortamı.",
    image: "/banner.png"
  }
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
                <p className="text-white/90 text-sm">
                  {item.text}
                </p>
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
            onClick={e => e.stopPropagation()}
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