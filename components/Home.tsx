import React from 'react';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import Philosophy from './Philosophy';
import Journal from './Journal';
import Footer from './Footer';
import { Product } from '../types';
import { MOCK_PRODUCTS, MOCK_JOURNAL } from '../data';

interface HomeProps {
    onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
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

export default Home;
