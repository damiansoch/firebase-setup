//remember to change permision in the firestore database/rules
//               ***                  //

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAefOLuRiMGl9UzjMYUUMqwIPljIj2dOB0",
  authDomain: "fir-setup-c9354.firebaseapp.com",
  projectId: "fir-setup-c9354",
  storageBucket: "fir-setup-c9354.appspot.com",
  messagingSenderId: "486670427737",
  appId: "1:486670427737:web:851f43edc5f18b97f93348",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //checking if doc exist
  const userDocRef = doc(db, "users", userAuth.uid); //db, what are we storing(collection), and uid from the ruthentication responce

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist, we want to create it
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date(); // so we know when they are signing in

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, //if previously  display name wasnt provided, it will be added now
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if it exist

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
