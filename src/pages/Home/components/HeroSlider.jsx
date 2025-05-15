import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/slider/banner.webp",
    title: "",
    subtitle: "",
    website: "",
    link: "",
  },
  {
    id: 2,
    image: "/slider/slider.webp",
    title: "",
    subtitle: "",
    link: "https://www.instagram.com/abimagd/",
  },
  {
    id: 3,
    image: "/slider/erbakan-soz.webp",
    title: "",
    subtitle: "",
    link: "",
  },
  {
    id: 4,
    image: "/slider/temel-yazılım.webp",
    title: "",
    subtitle: "",
    link: "https://www.abimagd.com/egitimler/1",
  },
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
    <div className="relative w-full aspect-[16/9] sm:aspect-auto sm:h-[60vh] md:h-[80vh] lg:h-[calc(100vh-10px)] overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        const SlideContent = (
          <>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover aspect-[16/9] sm:aspect-auto"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div
                className="text-white text-center px-2 sm:px-4"
                style={{
                  transform: `translateY(${isActive ? "0" : "20px"})`,
                  opacity: isActive ? 1 : 0,
                  transition: "all 0.7s ease-out 0.2s",
                }}
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 font-light">
                  {slide.subtitle}
                </p>
                {slide.website && (
                  <p className="text-base sm:text-lg md:text-xl font-medium text-blue-400">
                    {slide.website}
                  </p>
                )}
              </div>
            </div>
          </>
        );

        return (
          <div
            key={slide.id}
            style={{
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              transform: `scale(${isActive ? "1" : "1.05"})`,
              transition: "all 0.7s ease-in-out",
            }}
            className="absolute inset-0 w-full h-full"
          >
            {slide.link ? (
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                {SlideContent}
              </a>
            ) : (
              SlideContent
            )}
          </div>
        );
      })}

      {/* Geri ve İleri Butonları */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 sm:p-4 rounded-full transition-all z-10 group"
      >
        <FaChevronLeft className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 sm:p-4 rounded-full transition-all z-10 group"
      >
        <FaChevronRight className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Göstergeleri */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
