import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../data';
import { motion } from 'framer-motion';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import CloseButton from './ui/CloseButton';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, onAddToCart }) => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  useBodyScrollLock(isOpen);

  if (!isOpen || !product) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
      className="fixed inset-0 z-50 bg-aire-bg flex flex-col md:flex-row"
    >
      <CloseButton onClick={onClose} />

      {/* Left Column: Immersive Image */}
      <div className="w-full md:w-1/2 h-[35vh] md:h-full relative overflow-hidden bg-aire-paper">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 md:hidden pointer-events-none"></div>
      </div>

      {/* Right Column: Details */}
      <div className="w-full md:w-1/2 h-[65vh] md:h-full overflow-y-auto relative flex flex-col">
        <div className="flex-1 p-8 md:p-24 md:pt-40 flex flex-col">

          <div className="mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-aire-stone mb-6 block">
              {product.category}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-aire-text mb-8 leading-[1] tracking-tight">
              {product.name}
            </h1>
          </div>

          <div className="space-y-12 mb-12">
            <p className="font-serif text-xl md:text-2xl text-aire-text/80 italic leading-relaxed">
              "{product.poeticDescription}"
            </p>

            <div className="w-12 h-[1px] bg-aire-stone/40"></div>

            <div className="space-y-6">
              <h3 className="font-sans text-[10px] uppercase tracking-widest text-aire-stone">Esencia & Función</h3>
              <p className="font-sans text-sm md:text-base text-aire-text/70 leading-loose max-w-lg">
                {product.description}
                <br /><br />
                Cada unidad es examinada para asegurar que su presencia en tu espacio sea absoluta pero silenciosa.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:px-24 md:py-12 border-t border-aire-stone/20 bg-aire-bg/95 backdrop-blur-sm sticky bottom-0 mt-auto">
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-widest text-aire-stone mb-1">Precio</span>
              <span className="font-serif text-4xl text-aire-text">{product.price} €</span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 md:flex-none md:w-64 py-4 bg-aire-text text-aire-bg hover:bg-aire-stone hover:text-white transition-all duration-500 font-sans text-xs uppercase tracking-[0.2em] cursor-pointer"
            >
              Añadir a la Cesta
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailModal;