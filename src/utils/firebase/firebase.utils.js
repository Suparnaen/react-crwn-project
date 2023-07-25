// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

//to use firestore, we need to import its libraries
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

//to add data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    //create batch to add all our transaction in one
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());

        batch.set(docRef, object);
    })
    await batch.commit();
    console.log('Done');

};

//to fetch data from firestore categories

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;

        return acc;

    }, {})

    return categoryMap;

}
//get the user document
// export const createUserDocumentFromAuth = async (userAuth) => {
//     const userDocRef = doc(db, 'users', userAuth.uid);//here 'users is a collection we are defining

//     console.log(userDocRef);
// }

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    const userDocRef = doc(db, 'users', userAuth.uid);//here 'users is a collection we are defining

    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);//get the data for the userreference
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

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

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async () => await signOut(auth);

//observation listener..auth changes when user signin, or signout
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
