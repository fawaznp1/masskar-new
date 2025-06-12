import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({ data, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectChange = (productId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: { ...prev[productId], cleaning: value }
    }));
  };

  const handleQuantityChange = (productId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: { ...prev[productId], quantity: parseInt(value) || 1 }
    }));
  };

  const handleAddToCart = (item) => {
    const selected = selectedOptions[item.id];
    if (!selected?.cleaning) {
      alert('Please select a cleaning option');
      return;
    }
    const cartItem = {
      ...item,
      quantity: selected.quantity || 1,
      cleaning: selected.cleaning
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="product-list">
      {data.map(item => (
        <div className="product-card" key={item.id}>
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>Price per Kg: ${item.pricePerKg}</p>
          <p>Minimum Weight: {item.minWeight}kg</p>

          <label>
            Cleaning:
            <select
              value={selectedOptions[item.id]?.cleaning || ''}
              onChange={e => handleSelectChange(item.id, e.target.value)}
              required
            >
              <option value="">Select</option>
              {item.cleaningOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={selectedOptions[item.id]?.quantity || 1}
              onChange={e => handleQuantityChange(item.id, e.target.value)}
            />
          </label>

          <button onClick={() => handleAddToCart(item)}>Add</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
