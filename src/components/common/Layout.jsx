import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../../components/cart/ProductList';
import Cart from "../../components/cart/Cart";
import '../../styles/HomePage.css';

import fishData from '../../data/fishData';
import meatData from '../../data/meatData';

const allData = {
  fish: fishData,
  meat: meatData
};

const HomePage = () => {
  const { type } = useParams();
  const [cart, setCart] = useState([]);
  const [showCartMobile, setShowCartMobile] = useState(false);

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const selectedData = allData[type] || [];

  return (
    <div className="homepage">
      <button
        className="cart-toggle-btn"
        onClick={() => setShowCartMobile(!showCartMobile)}
      >
        {showCartMobile ? 'Hide Cart' : 'View Cart'}
      </button>

      <div className="products">
        <ProductList data={selectedData} onAddToCart={handleAddToCart} />
      </div>

      <div className={`sidebar-cart ${showCartMobile ? 'mobile-visible' : ''}`}>
        <Cart cartItems={cart} />
      </div>
    </div>
  );
};

export default HomePage;
