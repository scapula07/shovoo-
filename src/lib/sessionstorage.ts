import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';



// Store a session in Firestore
export const storeSession = async (session:any) => {
  try {
    const sessionRef = doc(db, 'sessions', session.id);
    await setDoc(sessionRef, session);
    console.log('Session stored:', session.id);
  } catch (error) {
    console.error('Error storing session:', error);
  }
};



// Retrieve a session from Firestore
export const getSession = async (sessionId:string) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      return sessionDoc.data();
    } else {
      console.log('Session not found:', sessionId);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
};




// Delete a session from Firestore
export const deleteSession = async (sessionId:string) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await deleteDoc(sessionRef);
    console.log('Session deleted:', sessionId);
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};
