import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    image: '/banner.jpg',
    title: '',
    subtitle: '',
    website: ''
  },
  {
    id: 2,
    image: '/slider.jpg',
    title: '',
    subtitle: ''
  },
  {
    id: 3,
    image: '/erbakan-soz.jpg',
    title: '',
    subtitle: ''
  },
  {
    id: 4,
    image: '/temel-yazılım.jpg',
    title: '',
    subtitle: ''
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          style={{
            opacity: index === currentSlide ? 1 : 0,
            visibility: index === currentSlide ? 'visible' : 'hidden',
            transform: `scale(${index === currentSlide ? '1' : '1.1'})`,
            transition: 'all 0.7s ease-in-out'
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: 'none'
            }}
          >
            <div className="text-white text-center px-4" 
                 style={{
                   transform: `translateY(${index === currentSlide ? '0' : '20px'})`,
                   opacity: index === currentSlide ? 1 : 0,
                   transition: 'all 0.7s ease-out 0.2s'
                 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider">
                {slide.title}
              </h1>
              <p className="text-xl md:text-3xl mb-4 font-light">
                {slide.subtitle}
              </p>
              {slide.website && (
                <p className="text-lg md:text-2xl font-medium text-blue-400">
                  {slide.website}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full transition-all z-10 group"
      >
        <FaChevronLeft className="text-white text-2xl group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full transition-all z-10 group"
      >
        <FaChevronRight className="text-white text-2xl group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider; 