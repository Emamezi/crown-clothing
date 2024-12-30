import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  snapshotEqual,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAJjwTJ9tACkWNAD4m6qhTh6eZy27IKGQA",
  authDomain: "crown-clothing-db-1c6ac.firebaseapp.com",
  projectId: "crown-clothing-db-1c6ac",
  storageBucket: "crown-clothing-db-1c6ac.firebasestorage.app",
  messagingSenderId: "960925130724",
  appId: "1:960925130724:web:6ced74df79895bfa5bb1f1",
};

// Firebase Initialization
const app = initializeApp(firebaseConfig);

//Initializing cloud firestore to get instance
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export const auth = getAuth();

provider.setCustomParameters({
  prompt: "select_account",
});

export function signInWithGooglePopUp() {
  return signInWithPopup(auth, provider);
}
export function signInWithGoogleRedirect() {
  return signInWithRedirect(auth, provider);
}

export async function createUserDocumentFromAuth(userAuth, additionalInfo) {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  //checking if there is an instance of "users" document that exists in the db
  const userSnapShot = await getDoc(userDocRef);

  //if no user data exixts
  if (!userSnapShot.exists()) {
    //get data props from the userAuth object returned
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      //write to the docRef if it exists, if it doesnt exist yet then create and write
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  //if user data exists
  return userDocRef;
  //return docref
}
export async function createAuthFromEmailandPassword(email, password) {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}
