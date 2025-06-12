import { useCart } from './CartContext';

const ItemCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div style={{ border: '1px solid #ccc', padding: 16 }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default ItemCard;
