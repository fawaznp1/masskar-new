import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../../components/cart/ProductList';
import Cart from "../../components/cart/Cart";
import '../../styles/HomePage.css';

import fishData from '../../data/fishData';
import meatData from '../../data/meatData';
import { ShoppingCart, X } from 'lucide-react';

const allData = {
  fish: fishData,
  meat: meatData
};

const HomePage = () => {
  const { type } = useParams();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(prev => !prev);
  };

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const selectedData = allData[type] || [];

  return (
    <div className="homepage">
      <div className="main-layout">
        <div className="products">
          <ProductList data={selectedData} onAddToCart={handleAddToCart} />
        </div>

        <div className="sidebar-cart desktop-only">
          <Cart cartItems={cart} />
        </div>
      </div>

      <button className="cart-toggle-btn" onClick={toggleCart}>
       {showCart ? (
    <>
      <X size={20} style={{ marginRight: '6px' }} />
      
    </>
  ) : (
    <>
      <ShoppingCart size={20} style={{ marginRight: '6px' }} />
      
    </>
  )}
      </button>

      {showCart && (
        <div className="mobile-cart-modal">
          <div className="mobile-cart-content">
            <Cart cartItems={cart} />
            <button className="close-cart-btn" onClick={toggleCart}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
