import { useEffect } from 'react';

const Stats = () => {
  useEffect(() => {
    const stats = [
      { id: 'students', value: 17 },
      { id: 'courses', value: 4 },
      { id: 'projects', value: 2 }
    ];

    stats.forEach(stat => {
      let current = 0;
      const target = stat.value;
      const step = target / 100;
      const element = document.getElementById(stat.id);

      const updateCounter = () => {
        if (current < target) {
          current += step;
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };

      updateCounter();
    });
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 id="students" className="text-4xl font-bold text-green-500 mb-2">0</h3>
            <p className="text-gray-600">Öğrenci</p>
          </div>
          <div>
            <h3 id="courses" className="text-4xl font-bold text-green-500 mb-2">0</h3>
            <p className="text-gray-600">Tamamlanan Kurs</p>
          </div>
          <div>
            <h3 id="projects" className="text-4xl font-bold text-green-500 mb-2">0</h3>
            <p className="text-gray-600">Etkinlik/Seminer Sayısı</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats; 