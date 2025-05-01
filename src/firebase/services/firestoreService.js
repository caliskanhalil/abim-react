import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config';

// Helper function to handle Firestore errors
const handleFirestoreError = (error, operation) => {
  console.error(`Firestore ${operation} error:`, error);
  if (error.code === 'permission-denied') {
    throw new Error('You do not have permission to perform this operation');
  } else if (error.code === 'not-found') {
    throw new Error('The requested document was not found');
  } else if (error.code === 'already-exists') {
    throw new Error('A document with this ID already exists');
  } else if (error.code === 'resource-exhausted') {
    throw new Error('The operation was aborted due to resource constraints');
  } else if (error.code === 'failed-precondition') {
    throw new Error('The operation was rejected because the system is not in a state required for the operation\'s execution');
  } else if (error.code === 'aborted') {
    throw new Error('The operation was aborted');
  } else if (error.code === 'out-of-range') {
    throw new Error('The operation was attempted past the valid range');
  } else if (error.code === 'unimplemented') {
    throw new Error('The operation is not implemented or not supported/enabled');
  } else if (error.code === 'internal') {
    throw new Error('Internal errors. Means some invariants expected by underlying system has been broken');
  } else if (error.code === 'unavailable') {
    throw new Error('The service is currently unavailable');
  } else if (error.code === 'data-loss') {
    throw new Error('Unrecoverable data loss or corruption');
  } else if (error.code === 'unauthenticated') {
    throw new Error('The request does not have valid authentication credentials');
  }
  throw error;
};

// Generic function to get all documents from a collection
export const getAllDocuments = async (collectionName) => {
  try {
    console.log(`Fetching all documents from ${collectionName}`);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`Successfully fetched ${documents.length} documents from ${collectionName}`);
    return documents;
  } catch (error) {
    handleFirestoreError(error, 'getAllDocuments');
  }
};

// Generic function to get a single document
export const getDocument = async (collectionName, documentId) => {
  try {
    console.log(`Fetching document ${documentId} from ${collectionName}`);
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log(`Successfully fetched document ${documentId}`);
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log(`Document ${documentId} does not exist`);
      return null;
    }
  } catch (error) {
    handleFirestoreError(error, 'getDocument');
  }
};

// Generic function to add a document
export const addDocument = async (collectionName, data) => {
  try {
    console.log(`Adding document to ${collectionName}`);
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`Successfully added document with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, 'addDocument');
  }
};

// Generic function to update a document
export const updateDocument = async (collectionName, documentId, data) => {
  try {
    console.log(`Updating document ${documentId} in ${collectionName}`);
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    console.log(`Successfully updated document ${documentId}`);
  } catch (error) {
    handleFirestoreError(error, 'updateDocument');
  }
};

// Generic function to delete a document
export const deleteDocument = async (collectionName, documentId) => {
  try {
    console.log(`Deleting document ${documentId} from ${collectionName}`);
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log(`Successfully deleted document ${documentId}`);
  } catch (error) {
    handleFirestoreError(error, 'deleteDocument');
  }
};

// Generic function to listen to collection changes
export const subscribeToCollection = (collectionName, callback) => {
  try {
    console.log(`Setting up listener for ${collectionName}`);
    const q = query(collection(db, collectionName));
    
    return onSnapshot(q, 
      (snapshot) => {
        const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(`Received update for ${collectionName}:`, documents.length, 'documents');
        callback(documents);
      },
      (error) => {
        console.error(`Error in ${collectionName} listener:`, error);
        handleFirestoreError(error, 'subscribeToCollection');
      }
    );
  } catch (error) {
    handleFirestoreError(error, 'subscribeToCollection');
  }
};

// Generic function to query documents
export const queryDocuments = async (collectionName, conditions = [], orderByField = null, limitCount = null) => {
  try {
    console.log(`Querying documents from ${collectionName}`);
    let q = collection(db, collectionName);
    
    // Apply conditions
    if (conditions.length > 0) {
      q = query(q, ...conditions.map(condition => where(condition.field, condition.operator, condition.value)));
    }
    
    // Apply ordering
    if (orderByField) {
      q = query(q, orderBy(orderByField));
    }
    
    // Apply limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Successfully queried ${documents.length} documents from ${collectionName}`);
    return documents;
  } catch (error) {
    handleFirestoreError(error, 'queryDocuments');
  }
}; 