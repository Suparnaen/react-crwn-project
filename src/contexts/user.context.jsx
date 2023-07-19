
import { createContext, useState } from "react";

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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

