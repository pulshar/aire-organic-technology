import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';
import CheckoutForm from './CheckoutForm';
import CloseButton from './ui/CloseButton';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSuccess?: () => void;
}

const OrderSummary: React.FC<{ cart: CartItem[], total: number }> = ({ cart, total }) => (
  <div className="bg-aire-linen order-1 lg:order-2 p-6 md:p-12 lg:p-20 lg:pt-26 border-l border-aire-stone/20 flex flex-col lg:h-full lg:overflow-y-auto no-scrollbar">
    <div className="flex justify-between items-center mb-10 border-b border-aire-stone/20 pb-4">
      <h3 className="font-serif text-2xl text-aire-text">Resumen del pedido</h3>
      <span className="lg:hidden text-[10px] uppercase tracking-widest text-aire-stone">
        {cart.reduce((s, i) => s + i.quantity, 0)} Objetos
      </span>
    </div>

    <div className="space-y-8 flex-1">
      {cart.map((item) => (
        <div key={item.id} className="flex gap-6 items-center">
          <div className="w-24 h-24 flex-none bg-white shadow-sm relative rounded-none">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <span className="absolute -top-1 -right-1 bg-aire-text text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-none font-sans shadow-lg">
              {item.quantity}
            </span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-serif text-xl text-aire-text truncate pr-4">{item.name}</h4>
              <span className="text-sm font-sans text-aire-text font-medium min-w-[40px] text-right">{item.price * item.quantity} €</span>
            </div>
            <p className="text-[10px] text-aire-stone uppercase tracking-widest">{item.category}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 pt-8 border-t border-aire-stone/20 space-y-5">
      <div className="flex justify-between text-xs font-sans">
        <span className="text-aire-stone uppercase tracking-[0.3em]">Subtotal</span>
        <span className="text-aire-text font-medium">{total} €</span>
      </div>
      <div className="flex justify-between text-xs font-sans">
        <span className="text-aire-stone uppercase tracking-[0.3em]">Envío</span>
        <span className="text-aire-text font-medium decoration-aire-stone/30">Gratis</span>
      </div>
      <div className="flex justify-between items-end pt-8 border-t border-aire-stone/20">
        <div className="flex flex-col">
          <span className="text-base uppercase tracking-[0.4em] text-aire-text font-bold">Total</span>
          <span className="text-[9px] text-aire-stone uppercase tracking-widest mt-1">Impuestos Incluidos</span>
        </div>
        <span className="font-serif text-5xl text-aire-text tracking-tighter">{total} €</span>
      </div>
    </div>
  </div>
);

const SuccessView: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="h-full min-h-[500px] flex flex-col items-center justify-center text-center px-4"
  >
    <div className="w-24 h-24 rounded-full bg-aire-linen flex items-center justify-center text-aire-text mb-8 border border-aire-stone/20 shadow-inner">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="font-serif text-4xl text-aire-text mb-4 lg:text-5xl">Pedido realizado</h2>
    <div className="space-y-6 max-w-sm">
      <p className="text-[11px] uppercase tracking-[0.3em] text-aire-text font-bold">Gratitud infinita</p>
      <div className="p-8 bg-aire-linen/50 rounded-sm border border-aire-text/5 space-y-6 text-center">
        <p className="text-sm text-aire-text/70 leading-relaxed font-sans italic">
          "Toda intención tiene su tiempo, todo viaje su destino."
        </p>
        <div className="h-[1px] bg-aire-stone/10 w-12 mx-auto"></div>
        <p className="text-[13px] text-aire-text/60 leading-relaxed font-sans">
          Esta es una demostración técnica de Aire. No se ha realizado cargo alguno. Tu carrito se ha liberado para nuevas exploraciones.
        </p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="mt-12 px-16 py-4 bg-aire-text text-white text-[10px] uppercase tracking-[0.4em] hover:bg-aire-dark transition-all duration-700 shadow-xl cursor-pointer"
    >
      Regresar a la Tienda
    </button>
  </motion.div>
);

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, onSuccess }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false);
    }
  }, [isOpen]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFormSuccess = () => {
    setShowSuccess(true);
    onSuccess?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
          className="fixed inset-0 z-50 bg-aire-bg flex flex-col overflow-hidden"
        >
          <CloseButton onClick={onClose} className="hidden lg:flex" />

          {/* Simple Mobile Header */}
          <div className="lg:hidden p-4 border-b border-aire-stone/20 bg-white flex justify-between items-center sticky top-0 z-30">
            <button onClick={onClose} className="text-aire-text text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Tienda
            </button>
            <h2 className="font-serif text-xl italic text-aire-text pr-4">Aire</h2>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-y-auto lg:overflow-hidden">
            <div className="p-6 md:p-12 bg-white order-2 lg:order-1 lg:overflow-y-auto lg:h-full no-scrollbar">
              {!showSuccess ? (
                <CheckoutForm onSuccess={handleFormSuccess} onCancel={onClose} total={total} />
              ) : (
                <SuccessView onClose={onClose} />
              )}
            </div>
            <OrderSummary cart={cart} total={total} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;