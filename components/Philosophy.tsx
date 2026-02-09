import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="flex flex-col md:flex-row w-full min-h-[85vh]">
      {/* Text Column - Deep Moss Green for contrast/color */}
      <div className="w-full md:w-1/2 bg-aire-moss text-aire-bg flex flex-col justify-center p-12 md:p-24 relative overflow-hidden">

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-white/60 mb-8 block">
            Nuestra Filosofía
          </span>

          <h2 className="font-serif text-5xl md:text-5xl lg:text-6xl leading-[1.1] mb-10">
            No diseñamos para <br />
            llamar la atención. <br />
            <span className="text-white/50 italic">Diseñamos para generar paz.</span>
          </h2>

          <div className="w-12 h-[1px] bg-white/30 mb-10"></div>

          <p className="font-sans text-sm md:text-base leading-loose text-white/80 max-w-md">
            En una era de ruido digital constante, creemos que el verdadero lujo es la ausencia de intrusión.
            Nuestra tecnología vive en los espacios tranquilos de tu hogar, esperando pacientemente el momento de servir.
            <br /><br />
            Materiales que envejecen, no plásticos que se rompen. Silencio por defecto.
          </p>

          <div className="mt-12 group">
            <button className="cursor-pointer flex items-center gap-2 relative text-xs underline underline-offset-3 uppercase tracking-widest hover:text-white/70 transition-colors duration-500 pb-1">
              Leer el Manifiesto
              <svg className="group-hover:translate-x-2 transition-transform duration-500 -mt-1 w-4 h-4 text-aire-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image Column */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative bg-aire-text overflow-hidden group">
        {/* Main Base Image - Dark Organic Texture (Leaves/Abstract Nature) */}
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop"
          alt="Textura orgánica y luz"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Overlay Image - Subtle abstract light/texture blended on top */}
        <img
          src="https://images.unsplash.com/photo-1490750967868-58cb75065ed2?q=80&w=2000&auto=format&fit=crop"
          alt="Detalle minimalista"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light pointer-events-none"
          loading="lazy"
          decoding="async"
        />

        {/* Color Tint Overlay */}
        <div className="absolute inset-0 bg-aire-moss/10 mix-blend-multiply pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Philosophy;