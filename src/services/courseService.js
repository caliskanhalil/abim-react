import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "../firebase/config";
  
  // 'courses' koleksiyon referansı
  const coursesRef = collection(db, "courses");
  
  export const getCourses = async () => {
    const snapshot = await getDocs(coursesRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  export const addCourse = async (course) => {
    const newCourse = {
      ...course,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(coursesRef, newCourse);
    return docRef.id; // ID geri döndürülüyor
  };
  
  export const updateCourse = async (id, course) => {
    const courseRef = doc(db, "courses", id);
    await updateDoc(courseRef, {
      ...course,
      updatedAt: serverTimestamp(),
    });
  };
  
  export const deleteCourse = async (id) => {
    const courseRef = doc(db, "courses", id);
    await deleteDoc(courseRef);
  };
  