import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        const savedCart = localStorage.getItem(`cart_${parsedUser.email}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      } else {
        setUser(null);
        setCart([]);
      }
    };

    handleUserChange();
    window.addEventListener('userUpdated', handleUserChange);
    return () => window.removeEventListener('userUpdated', handleUserChange);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (item) => {
    if (!user) throw new Error('Login required');
    setCart((prev) => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      if (user) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.pricePerKg * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      cartTotal,
      user
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
