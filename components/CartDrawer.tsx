import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const ConfirmRemoveModal: React.FC<{
  item: CartItem;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ item, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-[80] bg-aire-linen/95 backdrop-blur-md flex items-center justify-center p-8 text-center"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="max-w-xs"
    >
      <h3 className="font-serif text-2xl text-aire-text mb-4 ">Eliminar artículo</h3>
      <p className="font-sans text-sm text-aire-stone mb-8 leading-relaxed">
        Vas a eliminar <span className="text-aire-text font-medium">{item.name}</span> de tu carrito.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onConfirm}
          className="w-full py-3 bg-red-900/10 text-red-900 hover:bg-red-900 hover:text-white transition-all duration-500 font-sans text-[10px] uppercase tracking-widest cursor-pointer"
        >
          Confirmar
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 bg-aire-text text-aire-bg hover:bg-aire-stone transition-all duration-500 font-sans text-[10px] uppercase tracking-widest cursor-pointer"
        >
          Mantener
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout }) => {
  const location = useLocation();
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      onRemove(itemToRemove.id);
      setItemToRemove(null);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-aire-text/20 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-aire-linen z-[70] shadow-2xl transform transition-transform duration-700 ease-aire-smooth ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 relative overflow-hidden">

          <AnimatePresence>
            {itemToRemove && (
              <ConfirmRemoveModal
                item={itemToRemove}
                onConfirm={handleConfirmRemove}
                onCancel={() => setItemToRemove(null)}
              />
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-2xl text-aire-text italic">Tu Selección</h2>
            <button onClick={onClose} className="cursor-pointer text-aire-text hover:text-aire-stone transition-colors font-sans text-xs uppercase tracking-widest">
              Cerrar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-aire-stone opacity-50">
                <p className="font-serif italic text-xl">El vacío es forma.</p>
                <p className="font-sans text-xs mt-2 uppercase tracking-widest">Tu carrito está vacío.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-5 items-center animate-fade-in group">
                  <Link
                    to={`/producto/${item.id}`}
                    state={{ background: location }}
                    onClick={onClose}
                    className="flex-none"
                  >
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover bg-aire-paper grayscale hover:grayscale-0 transition-all duration-700" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/producto/${item.id}`}
                      state={{ background: location }}
                      onClick={onClose}
                    >
                      <h3 className="font-serif text-xl text-aire-text truncate hover:text-aire-stone transition-all">{item.name}</h3>
                    </Link>
                    <p className="font-sans text-[10px] text-aire-stone uppercase tracking-widest mt-1">{item.category}</p>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center bg-aire-stone/20 border border-aire-stone/20 rounded-full px-1 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="cursor-pointer bg-aire-linen rounded-full w-6 h-6 flex items-center justify-center text-aire-stone hover:text-aire-text transition-colors text-lg"
                        >
                          –
                        </button>
                        <span className="w-10 text-center font-sans text-sm text-aire-text">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="cursor-pointer bg-aire-linen rounded-full w-6 h-6 flex items-center justify-center text-aire-stone hover:text-aire-text transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="font-sans text-sm text-aire-text font-medium">{item.price * item.quantity} €</span>
                        <button
                          onClick={() => setItemToRemove(item)}
                          className="cursor-pointer text-[11px] uppercase tracking-widest text-red-900 md:text-aire-stone hover:text-red-900 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-aire-stone/20 pt-8 mt-4">
            <div className="flex justify-between items-end mb-6">
              <span className="font-sans text-xs uppercase tracking-widest text-aire-stone">Total</span>
              <span className="font-serif text-2xl text-aire-text">{total} €</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={cart.length === 0}
              className="w-full py-4 bg-aire-text text-aire-bg hover:bg-aire-stone transition-colors duration-500 font-sans text-xs uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;