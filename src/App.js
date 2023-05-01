import { useContext } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header/Header'
import Meals from './components/Meals/Meals'
import { CartProvider } from './store/cart-context';

function App() {
  return (
    <CartProvider>
    <Header />
    <Cart/>
    <main>
      <Meals />
    </main>
    </CartProvider>
  );
}

export default App;
