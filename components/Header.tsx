import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
  isHidden?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart, cartCount, isHidden = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const navItems = [
    { name: 'Colección', href: '#collection' },
    { name: 'Filosofía', href: '#philosophy' },
    { name: 'Bitácora', href: '#journal' }
  ];

  const headerColorClass = scrolled
    ? 'text-aire-text'
    : 'text-white mix-blend-difference';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center border-b transition-all duration-500 ease-in-out
        ${isHidden ? 'opacity-0 pointer-events-none translate-y-[-10px]' : 'opacity-100 translate-y-0'}
        ${scrolled
            ? 'bg-aire-bg/90 backdrop-blur-md py-4 px-6 md:px-12 border-aire-stone/20'
            : 'bg-transparent py-8 px-6 md:px-12 lg:px-24 border-transparent'
          }`}
      >

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className={`md:hidden ${headerColorClass} transition-colors duration-300 cursor-pointer`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links Desktop */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative group font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 py-2 cursor-pointer ${scrolled ? 'text-aire-text' : 'text-white/80 hover:text-white mix-blend-difference'}`}
            >
              {item.name}
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-current -translate-x-1/2 transition-[width] duration-300 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Logo - Centered and Scaling */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-3xl tracking-tighter cursor-pointer transition-all duration-500 ease-in-out ${scrolled
            ? 'scale-100 text-aire-text'
            : 'scale-125 text-white mix-blend-difference'
            }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Aire.
        </div>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className={`cursor-pointer relative group ${headerColorClass} transition-colors duration-300`}
        >
          <span className="font-sans text-xs uppercase tracking-widest group-hover:opacity-70 transition-opacity">
            Carrito ({cartCount})
          </span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-aire-bg flex flex-col items-center justify-center transition-all duration-500 ease-aire-smooth ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Close Button */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.button
              key="close-button"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5
                }
              }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-aire-text hover:text-aire-stone hover:rotate-90 transition-all duration-500 cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Logo inside Menu */}
        <div className={`absolute top-8 left-1/2 -translate-x-1/2 scale-125 font-serif text-3xl text-aire-text tracking-tighter transition-all duration-700 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Aire.
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col items-center gap-10">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative group font-serif text-4xl text-aire-text transition-all duration-700 delay-${index * 100} cursor-pointer ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            >
              {item.name}
              <span className="absolute left-1/2 -bottom-2 h-[1px] w-0 bg-aire-stone -translate-x-1/2 transition-[width] duration-500 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-12 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-aire-stone">
            Kyoto — Madrid
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;