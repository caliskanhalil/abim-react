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
  getDoc
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
import { initializeFirebase } from './config';

// Authentication Services
export const loginWithEmail = async (email, password) => {
  try {
    const { auth } = initializeFirebase();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const { auth } = initializeFirebase();
  return signOut(auth);
};

export const getCurrentUser = () => {
  const { auth } = initializeFirebase();
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
    const { db } = initializeFirebase();
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
    const { db } = initializeFirebase();
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
    const { db } = initializeFirebase();
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
    const { db } = initializeFirebase();
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
    const { db } = initializeFirebase();
    await deleteDoc(doc(db, 'courses', id));
  } catch (error) {
    throw error;
  }
};

// Blog Services
export const getBlogs = async () => {
  try {
    const { db } = initializeFirebase();
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const { db } = initializeFirebase();
    const blogRef = doc(db, 'blogs', id);
    const blogSnap = await getDoc(blogRef);
    if (blogSnap.exists()) {
      return {
        id: blogSnap.id,
        ...blogSnap.data()
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const addBlog = async (blogData) => {
  try {
    const { db } = initializeFirebase();
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const { db } = initializeFirebase();
    const blogRef = doc(db, 'blogs', id);
    await updateDoc(blogRef, {
      ...blogData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const { db } = initializeFirebase();
    await deleteDoc(doc(db, 'blogs', id));
  } catch (error) {
    throw error;
  }
};

// Student Services
export const getStudents = async () => {
  try {
    const { db } = initializeFirebase();
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const { db } = initializeFirebase();
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
    const { db } = initializeFirebase();
    const docRef = await addDoc(collection(db, 'students'), {
      ...studentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const { db } = initializeFirebase();
    const studentRef = doc(db, 'students', id);
    await updateDoc(studentRef, {
      ...studentData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const { db } = initializeFirebase();
    await deleteDoc(doc(db, 'students', id));
  } catch (error) {
    throw error;
  }
};

// Dashboard Services
export const getDashboardStats = async () => {
  try {
    const { db } = initializeFirebase();
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
    throw error;
  }
};

// Storage Services
export const uploadImage = async (file, path) => {
  try {
    const { storage } = initializeFirebase();
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
    const { storage } = initializeFirebase();
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    throw error;
  }
}; 