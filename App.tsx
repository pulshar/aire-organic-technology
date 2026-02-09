import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Philosophy from './components/Philosophy';
import Journal from './components/Journal';
import CartDrawer from './components/CartDrawer';
import Assistant from './components/Assistant';

// Code Splitting for Modals and heavier components
const CheckoutModal = lazy(() => import('./components/CheckoutModal'));
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal'));
const JournalDetailModal = lazy(() => import('./components/JournalDetailModal'));
import { Product } from './types';
import { MOCK_PRODUCTS, MOCK_JOURNAL } from './data';

import { useCart } from './hooks/useCart';

const Home: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  return (
    <main>
      <Hero />
      <ProductGrid
        products={MOCK_PRODUCTS}
        onAddToCart={onAddToCart}
      />
      <Philosophy />
      <Journal entries={MOCK_JOURNAL} />

      <Footer />
    </main>
  );
};

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
  const navigate = useNavigate();
  const background = location.state?.background;

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const handleCloseCheckout = () => setIsCheckoutOpen(false);

  const isDetailView = location.pathname.startsWith('/producto') || location.pathname.startsWith('/journal');

  return (
    <div className="min-h-screen bg-aire-bg text-aire-text selection:bg-aire-stone selection:text-white">
      <ScrollToTop />
      <Header
        onOpenCart={handleOpenCart}
        cartCount={cartCount}
        isHidden={isDetailView}
      />

      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <motion.div key={(background || location).pathname}>
            <Routes location={background || location}>
              <Route path="/" element={<Home onAddToCart={(p) => { addToCart(p); handleOpenCart(); }} />} />
              {/* Full page views if accessed directly */}
              <Route
                path="/producto/:id"
                element={<ProductDetailModal isOpen={true} onClose={() => navigate('/')} onAddToCart={(p) => { addToCart(p); handleOpenCart(); }} />}
              />
              <Route
                path="/journal/:id"
                element={<JournalDetailModal isOpen={true} onClose={() => navigate('/')} />}
              />
            </Routes>
          </motion.div>
        </AnimatePresence>

        {/* Overlays / Modals when navigating from Home */}
        <AnimatePresence mode="wait">
          {background && (
            <Routes location={location}>
              <Route
                path="/producto/:id"
                element={<ProductDetailModal isOpen={true} onClose={() => navigate(-1)} onAddToCart={(p) => { addToCart(p); handleOpenCart(); }} />}
              />
              <Route
                path="/journal/:id"
                element={<JournalDetailModal isOpen={true} onClose={() => navigate(-1)} />}
              />
            </Routes>
          )}
        </AnimatePresence>

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