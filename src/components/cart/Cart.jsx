import React from 'react';
import './Cart.css';

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h3>Cart</h3>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong><br />
              Cleaning: {item.cleaning}<br />
              Qty: {item.quantity}<br />
              Price: ${item.pricePerKg} per Kg
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
