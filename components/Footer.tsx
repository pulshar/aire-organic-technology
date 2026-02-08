import React from 'react';

const Footer: React.FC = () => {
  const linkClasses = "relative group font-sans text-sm text-aire-text/70 hover:text-aire-text transition-colors w-fit";
  const underlineClasses = "absolute left-1/2 bottom-0 h-[1px] w-0 bg-aire-text -translate-x-1/2 transition-[width] duration-300 ease-out group-hover:w-full";

  return (
    <footer className="bg-aire-clay py-24 px-6 md:px-24 border-t border-white/20 flex flex-col md:flex-row justify-between items-start gap-12 mt-auto">
      <div>
        <h4 className="font-serif text-3xl mb-6 text-aire-text">Aire.</h4>
        <p className="font-sans text-sm text-aire-text/60 max-w-xs leading-relaxed">
          Tecnología que respeta el silencio. <br />Diseñado en Kyoto, ensamblado con calma.
        </p>
      </div>
      <div className="flex gap-16">
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[10px] uppercase tracking-widest text-aire-text/40 mb-2">Legal</span>
          <a href="#" className={linkClasses}>
            Términos
            <span className={underlineClasses}></span>
          </a>
          <a href="#" className={linkClasses}>
            Privacidad
            <span className={underlineClasses}></span>
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[10px] uppercase tracking-widest text-aire-text/40 mb-2">Social</span>
          <a href="#" className={linkClasses}>
            Instagram
            <span className={underlineClasses}></span>
          </a>
          <a href="#" className={linkClasses}>
            Twitter
            <span className={underlineClasses}></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;