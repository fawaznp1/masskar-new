import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    user
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [deliveryTime, setDeliveryTime] = useState('Morning');
  const [location, setLocation] = useState('');

  const deliveryCharge = 3;
  const total = cartTotal + deliveryCharge;

  const handleConfirmOrder = () => {
    if (!user) {
      alert('Please log in to confirm your order.');
      navigate('/login');
      return;
    }

    if (!location.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const order = {
      id: Date.now(),
      userId: user.email,
      items: cart,
      total,
      paymentMethod,
      deliveryTime,
      location,
      date: new Date().toISOString(),
      status: 'pending'
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart();

    alert(`Order confirmed!\nYour order ID is: ${order.id}\nTotal: $${total.toFixed(2)}`);
    navigate('/orders');
  };

  const handleIncrease = (item) => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > item.minWeight) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    } else {
      // If below minimum, remove item
      removeFromCart(item.id);
    }
  };

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong><br />
                  Cleaning: {item.cleaning}<br />
                  Qty: {item.quantity}kg
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <button onClick={() => handleIncrease(item)}>+</button>
                  </div>
                  Price: ${item.pricePerKg} per kg<br />
                  <strong>Item Total: ${(item.pricePerKg * item.quantity).toFixed(2)}</strong>
                </div>
              </li>
            ))}
          </ul>

          <div className="order-summary">
            <h4>Order Summary</h4>
            <p>Subtotal: ${cartTotal.toFixed(2)}</p>
            <p>Delivery: ${deliveryCharge.toFixed(2)}</p>
            <p><strong>Total: ${total.toFixed(2)}</strong></p>

            <h4>Delivery Information</h4>
            <div className="form-group">
              <label>Payment Method:
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Online Transfer">Online Transfer</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>Delivery Time:
                <select value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)}>
                  <option value="Morning">Morning (8am-12pm)</option>
                  <option value="Afternoon">Afternoon (12pm-4pm)</option>
                  <option value="Evening">Evening (4pm-8pm)</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>Delivery Address:
                <textarea 
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter your full address..."
                  rows="3"
                  required
                />
              </label>
            </div>

            <button onClick={handleConfirmOrder} className="confirm-btn" disabled={!location.trim()}>
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
