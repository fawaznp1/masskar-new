import React, { useState } from 'react';
import ProductList from '../../components/cart/ProductList';
import Cart from "../../components/cart/Cart";
import './HomePage.css';
import fishData from '../../data/fishData'; 
import meatData from '../../data/meatData';

const HomePage = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  return (
    <div className="homepage">
      <div className="products">
        <ProductList data={fishData} onAddToCart={handleAddToCart} />
        <ProductList data={meatData} onAddToCart={handleAddToCart} />
      </div>
      <div className="sidebar-cart">
        <Cart cartItems={cart} />
      </div>
    </div>
  );
};

export default HomePage;
