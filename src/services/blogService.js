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
  
  const blogsRef = collection(db, "blogs");
  
  export const getBlogs = async () => {
    const snapshot = await getDocs(blogsRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  export const addBlog = async (blog) => {
    const newBlog = {
      ...blog,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(blogsRef, newBlog);
  };
  
  export const updateBlog = async (id, blog) => {
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, {
      ...blog,
      updatedAt: serverTimestamp(),
    });
  };
  
  export const deleteBlog = async (id) => {
    const blogRef = doc(db, "blogs", id);
    await deleteDoc(blogRef);
  };
  