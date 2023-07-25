import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
//import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext(
    {
        //products: [],
        categoriesMap: {},

    });


export const ProductsProvider = ({ children }) => {

    //const [products, setProducts] = useState([]);
    const [categoriesMap, setCategoriesMap] = useState({});

    //delete useEffect once all categories is loaded to firestore
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();

    }, []);

    const value = { categoriesMap };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

