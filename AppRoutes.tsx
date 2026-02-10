import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home';
import { Product } from './types';

const ProductDetailModal = lazy(() => import('./components/ProductDetailModal'));
const JournalDetailModal = lazy(() => import('./components/JournalDetailModal'));

interface AppRoutesProps {
    onAddToCart: (p: Product) => void;
    onOpenCart: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onAddToCart, onOpenCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;

    const handleAddToCartAndOpen = (p: Product) => {
        onAddToCart(p);
        onOpenCart();
    };

    return (
        <Suspense fallback={null}>
            <AnimatePresence mode="wait">
                <motion.div key={(background || location).pathname}>
                    <Routes location={background || location}>
                        <Route path="/" element={<Home onAddToCart={handleAddToCartAndOpen} />} />

                        {/* Full page views if accessed directly */}
                        <Route
                            path="/producto/:slug"
                            element={<ProductDetailModal isOpen={true} onClose={() => navigate('/')} onAddToCart={handleAddToCartAndOpen} />}
                        />
                        <Route
                            path="/bitacora/:slug"
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
                            path="/producto/:slug"
                            element={<ProductDetailModal isOpen={true} onClose={() => navigate(-1)} onAddToCart={handleAddToCartAndOpen} />}
                        />
                        <Route
                            path="/bitacora/:slug"
                            element={<JournalDetailModal isOpen={true} onClose={() => navigate(-1)} />}
                        />
                    </Routes>
                )}
            </AnimatePresence>
        </Suspense>
    );
};

export default AppRoutes;
