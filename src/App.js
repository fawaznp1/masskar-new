import './App.css';
import { CartProvider } from './components/cart/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </div>
  );
}

export default App;