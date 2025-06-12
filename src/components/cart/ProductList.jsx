import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // must be set up
import '../../styles/ProductList.css';


const ProductList = ({ data }) => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const [selectedOptions, setSelectedOptions] = useState({});

  // Sync local state with cart when it changes
  useEffect(() => {
    const initial = {};
    cart.forEach(item => {
      initial[item.baseId || item.id] = {
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

  const handleQuantityChange = (item, value) => {
    const quantity = Math.max(item.minWeight, parseInt(value) || item.minWeight);

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please log in to add items to your cart');
      navigate('/login');
      return;
    }

    const selected = selectedOptions[item.id] || {};
    const cleaning = selected.cleaning;

    if (!cleaning) {
      alert('Please select a cleaning option first');
      return;
    }

    const updatedItem = {
      ...item,
      baseId: item.id, // retain original product id for lookup
      id: `${item.id}-${cleaning}`, // consistent ID for cart tracking
      quantity,
      cleaning
    };

    addToCart(updatedItem);

    setSelectedOptions(prev => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        quantity
      }
    }));
  };

  return (
    <div className="product-list">
      {data.map(item => {
        const selected = selectedOptions[item.id] || {};
        const quantity = selected.quantity || item.minWeight;
        const cleaning = selected.cleaning || '';

        return (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>Price per Kg: ${item.pricePerKg}</p>
            <p>Minimum Weight: {item.minWeight}kg</p>

            <label>
              Cleaning:
              <select
                value={cleaning}
                onChange={e => handleSelectChange(item.id, e.target.value)}
              >
                <option value="">Select</option>
                {item.cleaningOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label>
              Quantity (min {item.minWeight}kg):
              <input
                type="number"
                min={item.minWeight}
                value={quantity}
                onChange={e => handleQuantityChange(item, e.target.value)}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
