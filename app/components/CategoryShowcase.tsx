'use client';

import { ArrowRight } from 'lucide-react';
import { Category } from '@/app/data/menu';

interface Props {
  categories: Category[];
  onSelect: (id: string) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  tajins: '/images/tajin-poulet.jpg',
  salads: '/images/salade.jpg',
  briwat: '/images/briwat-poulet.jpg',
  couscous: '/images/couscous-royal.jpg',
};

export default function CategoryShowcase({ categories, onSelect }: Props) {
  const cats = categories.filter(c => c.id !== 'all');

  function go(id: string) {
    onSelect(id);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="categories" className="max-w-7xl mx-auto px-5 lg:px-10 pt-8 lg:pt-12 scroll-mt-20">
      <div className="flex items-end justify-between mb-4 lg:mb-6">
        <h2 className="font-display text-2xl lg:text-4xl text-ink font-medium">Nos catégories</h2>
        <button
          onClick={() => go('all')}
          className="flex items-center gap-1 text-xs lg:text-sm text-amber-600 font-medium hover:underline"
        >
          Voir tout <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex lg:grid lg:grid-cols-4 gap-3 lg:gap-6 overflow-x-auto scrollbar-hide snap-x scroll-pl-5 lg:scroll-pl-0 -mx-5 px-5 lg:mx-0 lg:px-0 pb-1">
        {cats.map(cat => (
          <button
            key={cat.id}
            onClick={() => go(cat.id)}
            className="group snap-start flex-shrink-0 w-[42%] sm:w-[30%] lg:w-auto text-left"
          >
            <div className="aspect-[4/3] lg:aspect-[5/3] rounded-2xl overflow-hidden shadow-md shadow-amber-900/10 border border-line">
              <img
                src={CATEGORY_IMAGES[cat.id] ?? '/images/tajin-poulet.jpg'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-display text-ink text-base lg:text-xl mt-2.5 font-medium">{cat.name}</p>
            <p className="flex items-center gap-1 text-[11px] lg:text-sm text-amber-600 mt-0.5">
              Découvrir <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
