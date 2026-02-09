import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { JournalEntry } from '../types';

interface JournalProps {
  entries: JournalEntry[];
}

const Journal: React.FC<JournalProps> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // State for interaction
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [progress, setProgress] = useState(0);

  // Refs
  const hasDraggedRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  // Update progress bar on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progressValue = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setProgress(progressValue);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll(); // Init
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [entries]);

  // Custom Smooth Scroll Animation
  const smoothScrollTo = (target: number) => {
    const element = scrollRef.current;
    if (!element) return;

    const start = element.scrollLeft;
    const distance = target - start;
    const duration = 600; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 4);

      element.scrollLeft = start + (distance * ease);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  // Find nearest slide and animate to it
  const snapToNearest = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const slides = Array.from(container.querySelectorAll('article')) as HTMLElement[];
    if (slides.length === 0) return;

    const containerCenter = container.scrollLeft + (container.clientWidth / 2);

    const closest = slides.reduce((prev, curr) => {
      const prevCenter = prev.offsetLeft + (prev.offsetWidth / 2);
      const currCenter = curr.offsetLeft + (curr.offsetWidth / 2);
      const prevDist = Math.abs(containerCenter - prevCenter);
      const currDist = Math.abs(containerCenter - currCenter);
      return currDist < prevDist ? curr : prev;
    });

    const targetScroll = closest.offsetLeft - (container.clientWidth / 2) + (closest.offsetWidth / 2);
    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedTarget = Math.max(0, Math.min(targetScroll, maxScroll));

    smoothScrollTo(clampedTarget);
  };

  // Mouse Down: Start Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    setIsDown(true);
    hasDraggedRef.current = false;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  // Mouse Up/Leave: End Dragging & Snap
  const handleMouseUp = () => {
    if (!isDown) return;
    setIsDown(false);

    if (hasDraggedRef.current) {
      snapToNearest();
    }
  };

  const handleMouseLeave = () => {
    if (isDown) {
      handleMouseUp();
    }
  };

  // Mouse Move: Execute Drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }

    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleEntryClick = (entry: JournalEntry) => {
    if (hasDraggedRef.current) return;
    navigate(`/journal/${entry.id}`, { state: { background: location } });
  };

  return (
    <section id="journal" className="py-24 bg-aire-bg border-t border-white/50 overflow-hidden">

      <div className="px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between md:items-end mb-16">
        <div>
          <h2 className="font-serif text-4xl text-aire-text mb-2">Bitácora</h2>
          <p className="font-sans text-xs text-aire-stone uppercase tracking-[0.2em]">Crónicas de la calma</p>
        </div>
        <div className="hidden md:flex items-center gap-4 text-aire-stone/60">
          <span className="text-[10px] uppercase tracking-widest">Arrastrar para explorar</span>
          <div className="w-12 h-[1px] bg-aire-stone/30"></div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex gap-8 px-6 md:px-12 lg:px-24 overflow-x-auto no-scrollbar pb-12 select-none snap-x snap-mandatory md:snap-none 
          ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="group relative flex-none w-[85vw] md:w-[45vw] lg:w-[30vw] flex flex-col transition-opacity duration-300 snap-center cursor-pointer"
            onClick={() => handleEntryClick(entry)}
          >
            {/* Image Container with Hover Zoom */}
            <div className="overflow-hidden mb-8 aspect-[4/3] bg-aire-paper relative">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"></div>
              <img
                src={entry.image}
                alt={entry.title}
                className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 pointer-events-none ${isDown ? 'scale-100' : ''}`}
                draggable={false}
              />
              {/* Floating Date Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 pt-0.5 pb-1 z-20">
                <span className="text-[10px] font-sans tracking-widest text-aire-text uppercase -mt-1 ">{entry.date}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 border-l border-aire-stone/30 pl-6 transition-all duration-300 group-hover:border-aire-text/50">
              <h3 className="font-serif text-2xl text-aire-text mb-4 group-hover:translate-x-2 transition-transform duration-500">{entry.title}</h3>
              <p className="font-sans text-aire-stone text-sm leading-relaxed max-w-sm line-clamp-3 group-hover:translate-x-2 transition-transform duration-500">{entry.excerpt}</p>

              <div className="mt-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 flex items-center gap-2">
                <span className="font-sans text-[10px] uppercase tracking-widest text-aire-text">Leer Entrada</span>
                <svg className="w-3 h-3 text-aire-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </article>
        ))}

        <div className="flex-none w-6 md:w-12 lg:w-24"></div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 mt-4">
        <div className="w-full h-[1px] bg-aire-stone/20 relative">
          <div
            className="absolute top-0 left-0 h-[2px] bg-aire-text transition-all duration-100 ease-linear -mt-[0.5px]"
            style={{ width: `${Math.max(progress, 5)}%` }}
          ></div>
        </div>
      </div>

    </section>
  );
};

export default Journal;
