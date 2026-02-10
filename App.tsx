import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Assistant from './components/Assistant';
import AppRoutes from './AppRoutes';

// Code Splitting for Modals and heavier components
const CheckoutModal = lazy(() => import('./components/CheckoutModal'));

import { useCart } from './hooks/useCart';

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.state?.background) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);
  return null;
};

const App: React.FC = () => {
  const { cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const location = useLocation();

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const handleCloseCheckout = () => setIsCheckoutOpen(false);

  const isDetailView = location.pathname.startsWith('/producto') || location.pathname.startsWith('/bitacora');

  return (
    <div className="min-h-screen bg-aire-bg text-aire-text selection:bg-aire-stone selection:text-white">
      <ScrollToTop />
      <Header
        onOpenCart={handleOpenCart}
        cartCount={cartCount}
        isHidden={isDetailView}
      />

      <AppRoutes
        onAddToCart={addToCart}
        onOpenCart={handleOpenCart}
      />

      <Suspense fallback={null}>
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={handleCloseCheckout}
          cart={cart}
          onSuccess={clearCart}
        />
      </Suspense>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleOpenCheckout}
      />

      <Assistant />
    </div>
  );
};

export default App;