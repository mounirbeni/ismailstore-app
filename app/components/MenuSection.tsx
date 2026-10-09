'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/app/data/menu';
import { useCart } from '@/app/context/CartContext';
import MenuCard from './MenuCard';
import CategoryIcon from './CategoryIcon';

interface Props {
  activeCategory: string;
  menuItems: MenuItem[];
  query?: string;
}

const categoryGradients: Record<string, string> = {
  tajins:   'from-amber-400 to-orange-500',
  salads:   'from-green-400 to-emerald-500',
  briwat:   'from-yellow-400 to-amber-500',
  couscous: 'from-orange-400 to-red-500',
};

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  tajins:   { title: 'Tajins & Tanjia', subtitle: 'Mijotés à la marocaine' },
  salads:   { title: 'Salades',         subtitle: 'Entrées et accompagnements' },
  briwat:   { title: 'Briwat',          subtitle: 'Feuilletés croustillants' },
  couscous: { title: 'Couscous',        subtitle: 'Semoule à la vapeur' },
};

function PopularCard({ item }: { item: MenuItem }) {
  const { state, dispatch } = useCart();
  const cartItem = state.items.find(i => i.id === item.id);
  const qty = cartItem?.quantity ?? 0;
  const gradient = categoryGradients[item.category] ?? 'from-gray-400 to-gray-500';
  const [imgError, setImgError] = useState(false);
  const hasImage = item.image && !imgError;

  return (
    <div
      className="flex-shrink-0 w-40 lg:w-56 bg-cream-card rounded-3xl shadow-[0_2px_14px_rgba(120,70,30,0.07)] border border-line overflow-visible cursor-pointer active:scale-95 hover:shadow-[0_6px_22px_rgba(120,70,30,0.13)] transition-all"
      onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: item })}
    >
      <div className={`relative h-28 lg:h-36 rounded-t-3xl overflow-hidden ${!hasImage ? `bg-gradient-to-br ${gradient} flex items-center justify-center` : ''}`}>
        {hasImage ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <CategoryIcon category={item.category} className="w-12 h-12 text-white opacity-80" />
        )}
        {qty > 0 && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
            {qty}
          </span>
        )}
      </div>
      <div className="p-3 relative">
        <p className="font-display font-semibold text-ink text-sm leading-snug line-clamp-2">{item.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-amber-600 font-bold text-sm">{item.price} DH</span>
          <button
            onClick={e => {
              e.stopPropagation();
              dispatch({ type: 'ADD_ITEM', payload: item });
            }}
            className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-md shadow-amber-300/60 active:scale-90 transition-transform"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ cat }: { cat: string }) {
  const info = sectionTitles[cat];
  if (!info) return null;
  return (
    <div className="flex items-center gap-3 px-5 lg:px-10 pt-8 pb-4">
      <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
        <CategoryIcon category={cat} className="w-5 h-5 text-amber-600" />
      </span>
      <div>
        <h2 className="font-display text-2xl text-ink font-medium leading-none">{info.title}</h2>
        <p className="text-ink/50 text-xs mt-1.5">{info.subtitle}</p>
      </div>
    </div>
  );
}

const GRID = 'px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-5';

export default function MenuSection({ activeCategory, menuItems, query = '' }: Props) {
  const popular = menuItems.filter(i => i.badge === 'popular');
  const q = query.trim().toLowerCase();

  if (q) {
    const found = menuItems.filter(i => `${i.name} ${i.description} ${i.category}`.toLowerCase().includes(q));
    return (
      <div className="max-w-7xl mx-auto pb-32 lg:pb-12 pt-6">
        <p className="px-5 lg:px-10 pb-4 text-sm text-ink/60">
          {found.length} résultat{found.length > 1 ? 's' : ''} pour « {query.trim()} »
        </p>
        <div className={GRID}>{found.map(item => <MenuCard key={item.id} item={item} />)}</div>
        {found.length === 0 && <p className="px-5 lg:px-10 py-10 text-center text-ink/50">Aucun plat trouvé.</p>}
      </div>
    );
  }

  if (activeCategory !== 'all') {
    const filtered = menuItems.filter(i => i.category === activeCategory);
    return (
      <div className="max-w-7xl mx-auto pb-32 lg:pb-12">
        <SectionHeader cat={activeCategory} />
        <div className={GRID}>
          {filtered.map(item => <MenuCard key={item.id} item={item} />)}
        </div>
      </div>
    );
  }

  const ORDER = ['tajins', 'salads', 'briwat', 'couscous'];

  return (
    <div className="max-w-7xl mx-auto pb-32 lg:pb-12">
      {/* Popular section */}
      {popular.length > 0 && (
        <div className="mb-2">
          <div className="px-5 lg:px-10 pt-7 pb-4">
            <h2 className="font-display text-2xl lg:text-3xl text-ink font-medium">Plats populaires</h2>
            <p className="text-ink/50 text-xs lg:text-sm mt-1">Les plats préférés de nos clients</p>
          </div>
          <div className="flex gap-3 lg:gap-5 px-5 lg:px-10 pb-3 overflow-x-auto scrollbar-hide">
            {popular.map(item => <PopularCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {/* All categories */}
      {ORDER.map(cat => {
        const items = menuItems.filter(i => i.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <SectionHeader cat={cat} />
            <div className={GRID}>
              {items.map(item => <MenuCard key={item.id} item={item} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
