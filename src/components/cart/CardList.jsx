import ItemCard from './ItemCard';

const CardList = ({ items }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {items.map((item, i) => (
        <ItemCard key={i} item={item} />
      ))}
    </div>
  );
};

export default CardList;
