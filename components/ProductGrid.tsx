import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const location = useLocation();

  // Extract unique categories and add 'Todos' at the beginning
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(products.map(p => p.category)));
    return ['Todos', ...uniqueCats.sort()];
  }, [products]);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return products;
    return products.filter(product => product.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-aire-bg min-h-[80vh]" id="collection">
      <div className="mb-16 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-aire-text mb-8">Artefactos Esenciales</h2>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer relative group font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] pb-1 transition-colors duration-300 ${activeCategory === category
                ? 'text-aire-text'
                : 'text-aire-stone hover:text-aire-text'
                }`}
            >
              {category}
              <span
                className={`absolute left-1/2 bottom-0 h-[1px] bg-aire-text -translate-x-1/2 transition-[width] duration-300 ease-out ${activeCategory === category ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              ></span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group flex flex-col items-center">
            {/* Link wrapper for the image and info */}
            <Link
              to={`/producto/${product.id}`}
              state={{ background: location }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] bg-aire-paper overflow-hidden mb-6 rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Don't trigger Link
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="px-6 py-3 bg-white/90 text-aire-text font-sans text-xs uppercase tracking-widest hover:bg-white shadow-sm backdrop-blur-md transition-all hover:scale-105"
                  >
                    Adquirir
                  </button>
                </div>
              </div>

              <div className="text-center">
                <span className="font-sans text-[10px] uppercase tracking-widest text-aire-stone mb-1 block">
                  {product.category}
                </span>
                <h3 className="font-serif text-2xl text-aire-text mb-2 group-hover:text-aire-stone transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="font-sans text-xs text-aire-stone mb-3 max-w-[250px] mx-auto leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  Ver Detalle
                </p>
                <span className="font-sans text-sm text-aire-text opacity-70">
                  {product.price} €
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;