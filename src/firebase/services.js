import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db, storage } from './config';
  
  //////////////////////
  // 🔹 STUDENTS
  //////////////////////
  
  export const getStudents = async () => {
    const snapshot = await getDocs(collection(db, 'Students'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const addStudent = async (data) => {
    const studentWithTimestamps = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'Students'), studentWithTimestamps);
    return docRef.id;
  };
  
  export const updateStudent = async (id, data) => {
    const docRef = doc(db, 'Students', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  };
  
  export const deleteStudent = async (id) => {
    const docRef = doc(db, 'Students', id);
    await deleteDoc(docRef);
  };
  
  //////////////////////
  // 🔹 COURSES
  //////////////////////
  
  export const getCourses = async () => {
    const snapshot = await getDocs(collection(db, 'Courses'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const addCourse = async (data) => {
    const courseWithTimestamps = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'Courses'), courseWithTimestamps);
    return docRef.id;
  };
  
  export const updateCourse = async (id, data) => {
    const docRef = doc(db, 'Courses', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  };
  
  export const deleteCourse = async (id) => {
    const docRef = doc(db, 'Courses', id);
    await deleteDoc(docRef);
  };
  
  //////////////////////
  // 🔹 BLOGS
  //////////////////////
  
  export const getBlogs = async () => {
    const snapshot = await getDocs(collection(db, 'Blogs'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const addBlog = async (data) => {
    const blogWithTimestamps = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'Blogs'), blogWithTimestamps);
    return docRef.id;
  };
  
  export const updateBlog = async (id, data) => {
    const docRef = doc(db, 'Blogs', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  };
  
  export const deleteBlog = async (id) => {
    const docRef = doc(db, 'Blogs', id);
    await deleteDoc(docRef);
  };
  
  //////////////////////
  // 🔹 IMAGE UPLOAD
  //////////////////////
  
  export const uploadImage = async (file, path) => {
    const storageReference = ref(storage, path);
    await uploadBytes(storageReference, file);
    const url = await getDownloadURL(storageReference);
    return url;
  };
  
  //////////////////////
  // 🔹 COLLECTION CHECK
  //////////////////////
  
  export const checkCollections = async () => {
    const studentsSnap = await getDocs(collection(db, 'Students'));
    const coursesSnap = await getDocs(collection(db, 'Courses'));
    const blogsSnap = await getDocs(collection(db, 'Blogs'));
  
    return {
      hasStudentsData: !studentsSnap.empty,
      hasCoursesData: !coursesSnap.empty,
      hasBlogsData: !blogsSnap.empty,
    };
  };
  
  //////////////////////
  // 🔹 STATS
  //////////////////////
  
  export const getDashboardStats = async () => {
    const [studentsSnap, coursesSnap, blogsSnap] = await Promise.all([
      getDocs(collection(db, 'Students')),
      getDocs(collection(db, 'Courses')),
      getDocs(collection(db, 'Blogs')),
    ]);
  
    return {
      totalStudents: studentsSnap.size,
      totalCourses: coursesSnap.size,
      totalBlogs: blogsSnap.size,
    };
  };
  