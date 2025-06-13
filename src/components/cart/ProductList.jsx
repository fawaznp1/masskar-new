import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../../styles/ProductList.css';
import { ShoppingCart } from 'lucide-react';
import Toast from '../../components/common/Toast';
import { useSearch } from '../common/SearchContext';

const ProductList = ({ data }) => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const { searchTerm } = useSearch();

  const filteredDatafornav = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
    if (newQuantity < 0.5) newQuantity = 0.5;

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showToast('Please log in to add items to your cart', 'error');
      navigate('/login');
      return;
    }

    const cleaning = selected.cleaning;
    if (!cleaning) {
      showToast('Please select an option first', 'warning');
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

  const filteredData = () => {
    if (activeTab === 'offers') {
      return data.filter(item => item.offer === true);
    }
    if (activeTab === 'low') {
      return [...data].sort((a, b) => a.pricePerKg - b.pricePerKg);
    }
    return data;
  };

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

     {/* Tabs */}
<div className='tabs'>
  <button
    onClick={() => setActiveTab('all')}
    className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
  >
    All
  </button>
  <button
    onClick={() => setActiveTab('offers')}
    className={`tab-button ${activeTab === 'offers' ? 'active' : ''}`}
  >
    Offers
  </button>
  <button
    onClick={() => setActiveTab('low')}
    className={`tab-button ${activeTab === 'low' ? 'active' : ''}`}
  >
    Low Price
  </button>
</div>


      <div className="product-list">
{filteredData().filter(item =>
  filteredDatafornav.some(navItem => navItem.id === item.id)
).map(item => {
          const selected = selectedOptions[item.id] || {};
          const quantity = selected.quantity !== undefined ? selected.quantity : item.minWeight;
          const cleaning = selected.cleaning || '';
          const inCart = cart.some(ci => ci.originalId === item.id);

          return (
            <div className="product-card" key={item.id} style={{ position: 'relative' }}>
              {inCart && (
                <div className="cart-icon-overlay">
                  <ShoppingCart size={20} />
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
                  <span className='quantity me-2'>Quantity: {quantity}  </span>
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

      {activeTab === 'offers' ? (
  <div className="offers-message">
    <div className="offers-text">Currently we have no offers</div>
  </div>
) : null}


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
