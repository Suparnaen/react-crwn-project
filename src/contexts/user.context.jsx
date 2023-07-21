
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//creating context involves creating 2 part, actual context itself and the provider
//create context as CreateContext---to pass in default value(actual value we want to access)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


//PRovider is the actual component which receives children
export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }



    //whenever the auth state changes, return the user auth
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {

            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);

        })
        return unsubscribe;
    }, []); //only load once when component mounts

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

