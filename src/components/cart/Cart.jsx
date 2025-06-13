import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../../styles/Cart.css';
import { CreditCard, Package, ShoppingCart } from 'lucide-react';
import Toast from '../../components/common/Toast';

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
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const deliveryCharge = 3;
  const total = cartTotal + deliveryCharge;

  const handleConfirmOrder = () => {
    if (!user) {
      showToast('Please log in to confirm your order.', 'error');
      setTimeout(() => navigate('/login'), 3000); // Delay to allow toast to show
      return;
    }

    if (!location.trim()) {
      showToast('Please enter a delivery address', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
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

    showToast(`Order confirmed!\nYour order ID is: ${order.id}\nTotal: $${total.toFixed(2)}`, 'success');
    setTimeout(() => navigate('/orders'), 4000); // Delay to navigation 
  };

  const handleIncrease = (item) => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > item.minWeight) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="cart">
      {toast && ( 
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <h3> <ShoppingCart />  Your Cart ({cart.length} items)   </h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items-wrapper">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-content">
                  <div>
                    <h4 className="cart-item-title">{item.name}</h4>
                    <p className="cart-item-cleaning">Cleaning: {item.cleaning}</p>
                    <div className="quantity-line">
                      <span className="cart-item-quantity">Qty: {item.quantity} kg</span>
                      <div className="quantity-controls">
                        <button onClick={() => handleDecrease(item)}>-</button>
                        <button onClick={() => handleIncrease(item)}>+</button>
                      </div>
                    </div>
                    <p className="cart-item-price">
                      <strong>Item Total: ${(item.pricePerKg * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary-all">
            <div className="order-summary-container">
              <h4 className="order-summary-title"><CreditCard />  Order Summary</h4>
              <p className="order-summary-row">Subtotal: <span>${cartTotal.toFixed(2)}</span></p>
              <p className="order-summary-row">Delivery: <span>${deliveryCharge.toFixed(2)}</span></p>
              <p className="order-summary-total">Total: <strong><span>${total.toFixed(2)}</span></strong></p>
            </div>
          </div>

          <div className="delivery-info-container">
            <h4 className="delivery-info-heading"> <Package size={20}/> Delivery Information</h4>

            <div className="delivery-info-group">
              <label className="delivery-info-label">
                Payment Method:
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="delivery-info-select"
                >
                  <option value="Cash">Credit Card</option>
                  <option value="Card">Debit Card</option>
                  <option value="Online Transfer">Cash</option>
                </select>
              </label>
            </div>

            <div className="delivery-info-group">
              <label className="delivery-info-label">
                Delivery Time:
                <select
                  value={deliveryTime}
                  onChange={e => setDeliveryTime(e.target.value)}
                  className="delivery-info-select"
                >
                  <option value="Morning">Morning (8am–12pm)</option>
                  <option value="Afternoon">Afternoon (12pm–4pm)</option>
                  <option value="Evening">Evening (4pm–8pm)</option>
                </select>
              </label>
            </div>

            <div className="delivery-info-group">
              <label className="delivery-info-label">
                Delivery Address:
                <textarea
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter address with landmark..."
                  rows="3"
                  required
                  className="delivery-info-select"
                />
              </label>
            </div>
          </div>

          <button onClick={handleConfirmOrder} className="confirm-btn" disabled={!location.trim()}>
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
