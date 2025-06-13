import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../../styles/ProductList.css';
import { ShoppingCart } from 'lucide-react';
import Toast from '../../components/common/Toast';

const ProductList = ({ data }) => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const initial = {};
    cart.forEach(item => {
      initial[item.originalId] = {
        quantity: item.quantity,
        cleaning: item.cleaning
      };
    });
    setSelectedOptions(initial);
  }, [cart]);

  const handleSelectChange = (productId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: { ...prev[productId], cleaning: value }
    }));
  };

const handleQuantityChange = (item, change) => {
  const selected = selectedOptions[item.id] || {};
  const currentQuantity = selected.quantity !== undefined ? selected.quantity : 0.5;

  let newQuantity = currentQuantity + change;

  // Prevent going below 0.5
  if (newQuantity < 0.5) newQuantity = 0.5;

  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    showToast('Please log in to add items to your cart', 'error');
    navigate('/login');
    return;
  }

  const cleaning = selected.cleaning;
  if (!cleaning) {
    showToast('Please select a cleaning option first', 'warning');
    return;
  }

 const newItem = {
  ...item,
  originalId: item.id,
  id: `${item.id}-${cleaning}`,
  quantity: change,
  cleaning,
};

addToCart(newItem);


  showToast(`${item.name} added to cart`, 'success');
};


  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="product-list">
        {data.map(item => {
          const selected = selectedOptions[item.id] || {};
          const quantity = selected.quantity !== undefined ? selected.quantity : item.minWeight;
          const cleaning = selected.cleaning || '';
          const inCart = cart.some(ci => ci.originalId === item.id);

          return (
            <div className="product-card" key={item.id} style={{ position: 'relative' }}>
              {/* Show cart icon if item is in cart */}
              {inCart && (
                <div className="cart-icon-overlay">
                  <ShoppingCart size={20}  />
                </div>
              )}

              <img
                src={item.image}
                alt={item.name}
                style={{ cursor: 'pointer' }}
                onClick={() => setModalItem(item)}
              />
              <h4>{item.name}</h4>
              <h4>لا يعرض أحد</h4>

              <div className="d-flex">
                <p>Min Weight: {item.minWeight}kg</p>
                <p>{item.pricePerKg} QR/kg</p>
              </div>

              <label>
                <select
                  value={cleaning}
                  onChange={e => handleSelectChange(item.id, e.target.value)}
                >
                  <option value="">Select One:</option>
                  {item.cleaningOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>

              <label>
                <div className="quantity-buttons">
                  <span>Quantity: {quantity} kg</span>
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    disabled={quantity <= item.minWeight}
                  >
                    −
                  </button>
                  <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalItem && (
        <div className="modal-overlay" onClick={() => setModalItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalItem.name}</h2>
            <img src={modalItem.image} alt={modalItem.name} />
            <p>{modalItem.description}</p>
            <button className="modal-close" onClick={() => setModalItem(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
