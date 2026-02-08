import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { JournalEntry } from '../types';
import { MOCK_JOURNAL } from '../data';
import { motion } from 'framer-motion';

import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import CloseButton from './ui/CloseButton';

interface JournalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JournalDetailModal: React.FC<JournalDetailModalProps> = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const entry = MOCK_JOURNAL.find(e => e.id === id);

  useBodyScrollLock(isOpen);

  if (!isOpen || !entry) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
      className="fixed inset-0 z-50 bg-aire-bg overflow-y-auto"
    >
      <CloseButton onClick={onClose} />

      {/* Hero Image */}
      <div className="w-full h-[30vh] md:h-[40vh] relative overflow-hidden">
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aire-bg"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-2xl mx-auto px-6 md:px-0 pb-32 -mt-0 md:-mt-12 relative z-10">

        <div className="text-center mb-8 md:mb-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-aire-stone mb-4 block">
            {entry.date}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-aire-text mb-8 leading-tight">
            {entry.title}
          </h1>
          <div className="w-12 h-[1px] bg-aire-text/20 mx-auto"></div>
        </div>

        <article className="font-serif text-lg md:text-xl text-aire-text/80 leading-loose space-y-8 text-left">
          {entry.content.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]" : ""}>
              {paragraph}
            </p>
          ))}

          <div className="pt-12 flex justify-center">
            <span className="text-2xl text-aire-stone">***</span>
          </div>
        </article>

        <div className="mt-24 pt-12 border-t border-aire-stone/20 flex flex-col items-center">
          <p className="font-sans text-xs uppercase tracking-widest text-aire-stone mb-6">Escrito por el Equipo Aire</p>
          <button
            onClick={onClose}
            className="font-sans text-xs border-b border-aire-text pb-1 hover:text-aire-stone hover:border-aire-stone transition-colors"
          >
            Regresar a la Bitácora
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JournalDetailModal;