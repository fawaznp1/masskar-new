import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../../components/cart/ProductList';
import Cart from "../../components/cart/Cart";
import './HomePage.css';

import fishData from '../../data/fishData';
import meatData from '../../data/meatData';

const allData = {
  fish: fishData,
  meat: meatData
};

const HomePage = () => {
  const { type } = useParams(); // grabs "fish" or "meat"  or any categorrry  from the URL
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const selectedData = allData[type] || [];

  return (
    <div className="homepage">
      <div className="products">
        <ProductList data={selectedData} onAddToCart={handleAddToCart} />
      </div>
      <div className="sidebar-cart">
        <Cart cartItems={cart} />
      </div>
    </div>
  );
};

export default HomePage;
