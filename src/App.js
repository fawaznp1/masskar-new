import './App.css';
import { CartProvider } from './components/cart/CartContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
    <CartProvider>
  
        <AppRoutes /> {/* file containing all routes */}
    </CartProvider>
    </div>
  );
}

export default App;
