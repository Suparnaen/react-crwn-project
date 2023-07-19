// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

//to use firestore, we need to import its libraries
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLdT689q4c8TaJmptGVtqxvEzlCdRG-Kk",
    authDomain: "react-crown-project.firebaseapp.com",
    projectId: "react-crown-project",
    storageBucket: "react-crown-project.appspot.com",
    messagingSenderId: "704687638082",
    appId: "1:704687638082:web:9946487ceb70b899a90fdb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//setup a google provider to login using gmail
const googleProvider = new GoogleAuthProvider();//new keyword since it is a class

googleProvider.setCustomParameters(
    {
        prompt: "select_account"
    }
)

//create instance of authentication
export const auth = getAuth();

//create instance of signinwithpopup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//create our firestoredb instance
export const db = getFirestore();

//get the user document
// export const createUserDocumentFromAuth = async (userAuth) => {
//     const userDocRef = doc(db, 'users', userAuth.uid);//here 'users is a collection we are defining

//     console.log(userDocRef);
// }

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    const userDocRef = doc(db, 'users', userAuth.uid);//here 'users is a collection we are defining

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);//get the data for the userreference
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });

        } catch (error) {
            console.log("error creating the user " + error.message)
        }

        return userDocRef;
    }
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);


}