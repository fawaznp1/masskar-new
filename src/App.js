import './App.css';
import { CartProvider } from './components/cart/CartContext';
import { SearchProvider } from './components/common/SearchContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <CartProvider>
       <SearchProvider>
         <AppRoutes />
       </SearchProvider>
      </CartProvider>
    </div>
  );
}

export default App;