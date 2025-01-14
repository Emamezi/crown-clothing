import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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
//setting data automatically to the firesotre instead of adding it maunally
// collections-->document-->data
export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
  const collectionRef = collection(db, collectionKey); // reference to the collection on the firestore db instance
  const batch = writeBatch(db);

  //loop over the object to add and perform a write to the db path specified for each object instance using the title as unique key
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
}

export async function getCategoriesAndDocument() {
  //creatign a reference to the categories collection in the db
  const collectionRef = collection(db, "categories");
  // query against the collection
  const q = query(collectionRef);
  //retrieving results of the query and returns result as a querysnapshot
  const querySnapShot = await getDocs(q);
  console.log(querySnapShot.docs);
  //the snapshot results can be accesed throught the docs property see firebase DOCS for more info
  const categoriesMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();

    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  // const categoriesMap = querySnapShot.docs.reduce((acc, i) => {}, {});

  return categoriesMap;
}

export function signInWithGooglePopUp() {
  return signInWithPopup(auth, provider);
}
export function signInWithGoogleRedirect() {
  return signInWithRedirect(auth, provider);
}

export async function createUserDocumentFromAuth(userAuth, additionalInfo) {
  // userAuth = authenticated user object
  if (!userAuth) return;
  //create relative path to the new user db storage with unique uid from userAuth Obj
  const userDocRef = doc(db, "users", userAuth.uid);

  //checking if there is an instance of "users" document that exists in the db
  const userSnapShot = await getDoc(userDocRef);

  //if no user data exixts
  if (!userSnapShot.exists()) {
    //get data props to be stored in db from the userAuth object
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

export async function signOutAuthUser() {
  return await signOut(auth);
}

export function onAuthStateChangeListner(callback) {
  return onAuthStateChanged(auth, callback);
}
