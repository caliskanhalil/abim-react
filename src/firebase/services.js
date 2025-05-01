import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db, storage } from './config';

// Authentication Services
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    return {
      user: userCredential.user,
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Giriş yapılırken bir hata oluştu');
  }
};

export const logout = async () => {
  return signOut(auth);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Firestore Services
export const getCourses = async () => {
  try {
    const coursesRef = collection(db, 'courses');
    const q = query(coursesRef, orderBy('mainTitle', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const courseRef = doc(db, 'courses', id);
    const courseSnap = await getDoc(courseRef);
    if (courseSnap.exists()) {
      return {
        id: courseSnap.id,
        ...courseSnap.data()
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const addCourse = async (courseData) => {
  try {
    const docRef = await addDoc(collection(db, 'courses'), {
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const courseRef = doc(db, 'courses', id);
    await updateDoc(courseRef, {
      ...courseData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    await deleteDoc(doc(db, 'courses', id));
  } catch (error) {
    throw error;
  }
};

// Blog Services
export const getBlogs = async () => {
  try {
    console.log('Starting to fetch blogs from Firestore...');
    const blogsRef = collection(db, 'blogs');
    console.log('Collection reference created');
    
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    console.log('Query created with orderBy');
    
    console.log('Executing query...');
    const querySnapshot = await getDocs(q);
    console.log('Query executed successfully, received', querySnapshot.size, 'documents');
    
    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Blogs processed successfully');
    
    return blogs;
  } catch (error) {
    console.error('Error in getBlogs:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Check for specific error types
    if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to access blogs');
    } else if (error.code === 'not-found') {
      throw new Error('Blogs collection not found');
    } else if (error.code === 'unavailable') {
      throw new Error('Firestore service is currently unavailable');
    }
    
    throw new Error(`Failed to fetch blogs: ${error.message}`);
  }
};

export const getBlogById = async (id) => {
  try {
    console.log('Fetching blog with ID:', id);
    const blogRef = doc(db, 'blogs', id);
    const blogSnap = await getDoc(blogRef);
    
    if (blogSnap.exists()) {
      console.log('Blog found successfully');
      return {
        id: blogSnap.id,
        ...blogSnap.data()
      };
    }
    
    console.log('Blog not found');
    return null;
  } catch (error) {
    console.error('Error in getBlogById:', {
      code: error.code,
      message: error.message,
      blogId: id
    });
    throw new Error(`Failed to fetch blog: ${error.message}`);
  }
};

export const addBlog = async (blogData) => {
  try {
    console.log('Adding new blog...');
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Blog added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error in addBlog:', {
      code: error.code,
      message: error.message,
      blogData: { ...blogData, content: '[REDACTED]' }
    });
    throw new Error(`Failed to add blog: ${error.message}`);
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    console.log('Updating blog with ID:', id);
    const blogRef = doc(db, 'blogs', id);
    await updateDoc(blogRef, {
      ...blogData,
      updatedAt: serverTimestamp()
    });
    console.log('Blog updated successfully');
  } catch (error) {
    console.error('Error in updateBlog:', {
      code: error.code,
      message: error.message,
      blogId: id
    });
    throw new Error(`Failed to update blog: ${error.message}`);
  }
};

export const deleteBlog = async (id) => {
  try {
    console.log('Deleting blog with ID:', id);
    await deleteDoc(doc(db, 'blogs', id));
    console.log('Blog deleted successfully');
  } catch (error) {
    console.error('Error in deleteBlog:', {
      code: error.code,
      message: error.message,
      blogId: id
    });
    throw new Error(`Failed to delete blog: ${error.message}`);
  }
};

// Student Services
export const getStudents = async () => {
  try {
    console.log('Setting up students listener...');
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, orderBy('createdAt', 'desc'));
    
    return new Promise((resolve, reject) => {
      console.log('Creating onSnapshot listener...');
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          console.log('Students snapshot received:', querySnapshot.size, 'documents');
          const students = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          resolve(students);
        },
        (error) => {
          console.error('Students listener error:', error);
          console.error('Error details:', {
            code: error.code,
            message: error.message,
            stack: error.stack
          });
          reject(new Error('Öğrenci listesi alınırken bir hata oluştu'));
        }
      );
    });
  } catch (error) {
    console.error('Get students error:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw new Error('Öğrenci listesi alınırken bir hata oluştu');
  }
};

export const getStudentById = async (id) => {
  try {
    const studentRef = doc(db, 'students', id);
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
      return {
        id: studentSnap.id,
        ...studentSnap.data()
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const docRef = await addDoc(collection(db, 'students'), {
      ...studentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Add student error:', error);
    throw new Error('Öğrenci eklenirken bir hata oluştu');
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const studentRef = doc(db, 'students', id);
    await updateDoc(studentRef, {
      ...studentData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Update student error:', error);
    throw new Error('Öğrenci güncellenirken bir hata oluştu');
  }
};

export const deleteStudent = async (id) => {
  try {
    await deleteDoc(doc(db, 'students', id));
  } catch (error) {
    console.error('Delete student error:', error);
    throw new Error('Öğrenci silinirken bir hata oluştu');
  }
};

// Dashboard Services
export const getDashboardStats = async () => {
  try {
    const [coursesSnapshot, blogsSnapshot, studentsSnapshot] = await Promise.all([
      getDocs(collection(db, 'courses')),
      getDocs(collection(db, 'blogs')),
      getDocs(collection(db, 'students'))
    ]);

    return {
      totalCourses: coursesSnapshot.size,
      totalBlogs: blogsSnapshot.size,
      totalStudents: studentsSnapshot.size,
      recentCourses: coursesSnapshot.docs
        .slice(0, 5)
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })),
      recentBlogs: blogsSnapshot.docs
        .slice(0, 5)
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })),
      recentStudents: studentsSnapshot.docs
        .slice(0, 5)
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
    };
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    throw new Error('İstatistikler alınırken bir hata oluştu');
  }
};

// Storage Services
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    throw error;
  }
};

// Örnek veri ekleme fonksiyonları
export const initializeExampleData = async () => {
  try {
    // Örnek kurs verisi
    const courseData = {
      mainTitle: "HTML EĞİTİMİ",
      subtitle: "Eğitim 3 ay sürecektir",
      imageUrl: "https://picsum.photos/200/300",
      content: {
        egitimSuresi: [
          { "Başlangıç": "2024-05-01" },
          { "Bitiş": "2024-08-01" }
        ],
        mufredat: [
          "HTML Temelleri",
          "Etiketler ve Özellikler",
          "Formlar ve Tablolar",
          "Semantik HTML"
        ],
        tarih: "Cumartesi : 14:00"
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Kursu ekle
    const courseRef = await addDoc(collection(db, 'courses'), courseData);

    // Örnek öğrenci verisi
    const studentData = {
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      phone: "555-123-4567",
      courseId: courseRef.id,
      courseName: courseData.mainTitle,
      registrationDate: "2024-03-15",
      status: "active",
      paymentStatus: "paid",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Öğrenciyi ekle
    await addDoc(collection(db, 'students'), studentData);

    return true;
  } catch (error) {
    console.error('Initialize example data error:', error);
    throw new Error('Örnek veriler eklenirken bir hata oluştu');
  }
};

// Koleksiyon kontrolü
export const checkCollections = async () => {
  try {
    const [coursesSnapshot, studentsSnapshot] = await Promise.all([
      getDocs(collection(db, 'courses')),
      getDocs(collection(db, 'students'))
    ]);

    return {
      hasCoursesData: !coursesSnapshot.empty,
      hasStudentsData: !studentsSnapshot.empty
    };
  } catch (error) {
    console.error('Check collections error:', error);
    throw new Error('Koleksiyonlar kontrol edilirken bir hata oluştu');
  }
}; 