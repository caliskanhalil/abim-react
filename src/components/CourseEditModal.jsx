import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const CourseEditModal = ({ isOpen, onClose, course, onSave }) => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    subtitle: '',
    imageUrl: '',
    content: {
      egitimSuresi: [
        { "Başlangıç": "" },
        { "Bitiş": "" }
      ],
      mufredat: [],
      tarih: ''
    }
  });
  const [newCurriculumItem, setNewCurriculumItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        mainTitle: '',
        subtitle: '',
        imageUrl: '',
        content: {
          egitimSuresi: [
            { "Başlangıç": "" },
            { "Bitiş": "" }
          ],
          mufredat: [],
          tarih: ''
        }
      });
    }
  }, [course]);

  const handleAddCurriculumItem = () => {
    if (newCurriculumItem.trim()) {
      setFormData({
        ...formData,
        content: {
          ...formData.content,
          mufredat: [...formData.content.mufredat, newCurriculumItem.trim()]
        }
      });
      setNewCurriculumItem('');
    }
  };

  const handleRemoveCurriculumItem = (index) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        mufredat: formData.content.mufredat.filter((_, i) => i !== index)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Kaydetme işlemi başarısız:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {course ? 'Kursu Düzenle' : 'Yeni Kurs'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kurs Adı
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Başlık
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resim URL
            </label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.content.egitimSuresi[0]["Başlangıç"]}
                onChange={(e) => setFormData({
                  ...formData,
                  content: {
                    ...formData.content,
                    egitimSuresi: [
                      { "Başlangıç": e.target.value },
                      formData.content.egitimSuresi[1]
                    ]
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.content.egitimSuresi[1]["Bitiş"]}
                onChange={(e) => setFormData({
                  ...formData,
                  content: {
                    ...formData.content,
                    egitimSuresi: [
                      formData.content.egitimSuresi[0],
                      { "Bitiş": e.target.value }
                    ]
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ders Günü ve Saati
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Cumartesi : 14:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.content.tarih}
                onChange={(e) => setFormData({
                  ...formData,
                  content: {
                    ...formData.content,
                    tarih: e.target.value
                  }
                })}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Müfredat</h3>
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCurriculumItem}
                  onChange={(e) => setNewCurriculumItem(e.target.value)}
                  placeholder="Yeni müfredat konusu ekle"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCurriculumItem()}
                />
                <button
                  type="button"
                  onClick={handleAddCurriculumItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {formData.content.mufredat.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100"
                >
                  <span className="text-gray-700">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCurriculumItem(index)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEditModal; 