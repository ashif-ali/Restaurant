import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [cart, setCart] = useState({});

    const updateQuantity = (itemId, newQuantity) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            if (newQuantity <= 0) {
                delete updatedCart[itemId];
            } else {
                updatedCart[itemId] = newQuantity;
            }
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart({});
    };

    const value = {
        userDetails,
        setUserDetails,
        cart,
        updateQuantity,
        clearCart,
    };

    return (
        <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
    );
}

export function useOrder() {
    return useContext(OrderContext);
}
