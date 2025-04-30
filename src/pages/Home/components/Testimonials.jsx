import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    comment: "Buradaki eğitimler sayesinde kariyerime yön verdim!"
  },
  {
    id: 2,
    name: "Ayşe Demir",
    comment: "Anlatım çok sade ve anlaşılır, herkese tavsiye ederim."
  },
  {
    id: 3,
    name: "Mehmet Kara",
    comment: "Eğitmenler gerçekten işini bilen uzmanlar."
  },
  {
    id: 4,
    name: "Elif Şahin",
    comment: "Projelerle pratik yaparak öğrendim, süperdi!"
  },
  {
    id: 5,
    name: "Canan Aydın",
    comment: "Destek ekibi her soruma anında cevap verdi."
  },
  {
    id: 6,
    name: "Burak Demir",
    comment: "Kariyerimde büyük ilerleme kaydettim."
  },
  {
    id: 7,
    name: "Zeynep Uslu",
    comment: "Öğrenme platformu çok akıcı ve eğlenceli."
  },
  {
    id: 8,
    name: "Serkan Yılmaz",
    comment: "Test soruları ve ödevler çok faydalıydı."
  },
  {
    id: 9,
    name: "Pelin Aksoy",
    comment: "Sadece ders değil, network de kazandım."
  },
  {
    id: 10,
    name: "Emre Kaya",
    comment: "Kesinlikle tavsiye ederim, muhteşem içerik."
  }
];

const Testimonials = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (isDragging) return;
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Öğrenci Yorumları</h2>
        <div 
          ref={containerRef}
          className="flex overflow-x-hidden cursor-grab space-x-6 pb-8"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="flex-shrink-0 w-72 bg-white p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
              <p className="font-bold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 