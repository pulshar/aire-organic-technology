import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000&auto=format&fit=crop"
        alt="Atmosphere"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {/* Sepia/Warm Overlay */}
      <div className="absolute inset-0 bg-aire-earth mix-blend-multiply opacity-30"></div>
      <div className="absolute inset-0 bg-aire-bg opacity-10 mix-blend-soft-light"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">

        {/* H1: Mixed Typography & Animation */}
        <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight drop-shadow-lg mb-8 opacity-0 animate-slide-up-slow">
          El mundo grita, <br />
          <span className="italic font-light text-white/80">tu hogar susurra.</span>
        </h1>

        {/* Separator & Subtitle with Delay */}
        <div className="flex flex-col items-center opacity-0 animate-slide-up-slow" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 h-[1px] bg-white/50 mb-8"></div>
          <p className="text-aire-bg font-sans text-sm tracking-[0.2em] uppercase opacity-90 max-w-lg leading-relaxed mix-blend-screen">
            Tecnología que desaparece <br /> para que tú aparezcas.
          </p>
        </div>

        {/* Heavy Button with Icon & Interaction */}
        <button
          onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          className="cursor-pointer group mt-16 pl-8 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/40 text-white font-sans text-xs tracking-[0.2em] hover:bg-white hover:text-aire-text transition-all duration-700 ease-aire-smooth uppercase flex items-center gap-6 opacity-0 animate-slide-up-slow"
          style={{ animationDelay: '0.6s' }}
        >
          <span>Explorar Colección</span>
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-aire-text/20 transition-colors duration-500">
            <div className="relative w-4 h-4 overflow-hidden">
              {/* Arrow exiting down */}
              <svg className="absolute inset-0 w-4 h-4 transition-transform duration-500 ease-aire-smooth group-hover:translate-y-[150%]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {/* Arrow entering from top */}
              <svg className="absolute inset-0 w-4 h-4 -translate-y-[150%] transition-transform duration-500 ease-aire-smooth group-hover:translate-y-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;