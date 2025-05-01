import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

// Firestore'daki students koleksiyon referansı
const studentsRef = collection(db, "students");

export const getStudents = async () => {
  const querySnapshot = await getDocs(studentsRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addStudent = async (student) => {
  const newStudent = {
    ...student,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await addDoc(studentsRef, newStudent);
};

export const updateStudent = async (id, student) => {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, {
    ...student,
    updatedAt: serverTimestamp(),
  });
};

export const deleteStudent = async (id) => {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
};
