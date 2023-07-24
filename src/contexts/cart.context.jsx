import { createContext, useState, useEffect } from "react";

//helper function to find existing product & increment quantity

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contain productToAdd
    const existingCartItems = cartItems.find((item) => item.id === productToAdd.id);//returns a boolean value

    //if found, then increment the quantity
    if (existingCartItems) {
        return cartItems.map((item) => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item)
    }

    //return new array with modified cartItems/new cartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }]

}

const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItems = cartItems.find((item) => item.id === cartItemToRemove.id);

    //check if quantity is equal to 1, then remove that item from the cart
    if (existingCartItems.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    //return the reduced quantity
    return cartItems.map((item) => item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item);

}

const clearCartItem = (cartItems, cartItemToClear) => {

    //if cartitem.id matches with cartItemtoremove then filter/remove that item
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);


}

export const CartContext = createContext({

    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,

});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartItem = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartItem);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

        setCartTotal(newCartTotal);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal }





    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}