'use client';

import { Category } from '@/app/data/menu';
import CategoryIcon from './CategoryIcon';

interface Props {
  active: string;
  onSelect: (id: string) => void;
  categories: Category[];
}

export default function CategoryTabs({ active, onSelect, categories }: Props) {
  return (
    <div className="sticky top-16 lg:top-[72px] z-20 bg-cream/95 backdrop-blur border-b border-line/70">
      <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-hide px-5 lg:px-10 py-3 gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 flex-shrink-0 border ${
              active === cat.id
                ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-300/50'
                : 'bg-cream-card border-line text-ink/80 hover:border-amber-300'
            }`}
          >
            <CategoryIcon category={cat.id} className="w-4 h-4" />
            <span>{cat.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${active === cat.id ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'}`}>{cat.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
