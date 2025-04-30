import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { coursesData } from '../../data/mockCourses';
import { FaCalendar, FaClock, FaArrowRight, FaGift } from 'react-icons/fa';
import ApplicationModal from './ApplicationModal';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleApply = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Eğitimler - ABİM Adana Anadolu Gençlik Derneği</title>
        <meta name="description" content="ABİM'de verilen eğitimler ve kurslar hakkında bilgi alın." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Eğitimlerimiz</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Geleceğinizi şekillendirmek için tasarlanmış kapsamlı eğitim programlarımızı keşfedin.
              Uzman eğitmenlerimizle birlikte teknoloji dünyasında yerinizi alın.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={course.imageUrl}
                    alt={course.mainTitle}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium">
                    <FaGift className="mr-1" />
                    Ücretsiz
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {course.mainTitle}
                  </h2>
                  <p className="text-gray-600 mb-4">{course.subtitle}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="text-blue-500 mr-2" />
                      <span>Başlangıç: {course.content.egitimSuresi[0]["Başlangıç"]}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="text-blue-500 mr-2" />
                      <span>{course.content.tarih}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/egitimler/${course.id}`)}
                      className="flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-lg 
                               hover:bg-blue-200 transition-all duration-300 font-medium"
                    >
                      Detayları Gör
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleApply(course.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Başvur
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ApplicationModal 
        show={showModal}
        handleClose={() => setShowModal(false)}
        courseId={selectedCourseId}
      />
    </>
  );
};

export default CoursesPage; 