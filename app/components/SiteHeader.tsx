'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const NAV = [
  { label: 'Accueil', id: 'top' },
  { label: 'Notre menu', id: 'menu' },
  { label: 'À propos', id: 'apropos' },
  { label: 'Livraison', id: 'livraison' },
  { label: 'Contact', id: 'contact' },
];

interface Props {
  query: string;
  onQuery: (q: string) => void;
}

export default function SiteHeader({ query, onQuery }: Props) {
  const { dispatch, totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [current, setCurrent] = useState('top');

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    NAV.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function handleQuery(value: string) {
    onQuery(value);
    if (value.trim()) document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleSearch() {
    if (searchOpen) onQuery('');
    setSearchOpen(!searchOpen);
  }

  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b border-line/70">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 h-16 lg:h-[72px] flex items-center gap-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl overflow-hidden shadow-md shadow-amber-200/70 border border-line">
            <img src="/images/profile.jpg" alt="Yed Lmiima" className="w-full h-full object-cover object-top" />
          </div>
          <div className="leading-none">
            <p className="font-display font-semibold text-amber-600 text-xl lg:text-[1.65rem]">Yed Lmiima</p>
            <p className="text-ink/60 text-[9px] lg:text-[11px] mt-1">Cuisine marocaine à Marrakech</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-center gap-9 flex-1 text-sm">
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`py-1 border-b-2 transition-colors ${
                current === n.id
                  ? 'text-amber-600 border-amber-500 font-semibold'
                  : 'text-ink/80 border-transparent hover:text-amber-600'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex-1 lg:hidden" />

        {/* Actions */}
        <div className="flex items-center gap-1 lg:gap-3 text-ink">
          <button
            onClick={toggleSearch}
            aria-label="Rechercher"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          <Link
            href="/track"
            aria-label="Suivre ma commande"
            title="Suivre ma commande"
            className="hidden lg:flex w-10 h-10 rounded-full items-center justify-center hover:bg-amber-100 transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            onClick={() => dispatch({ type: 'SET_CART_OPEN', payload: true })}
            aria-label="Panier"
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-0.5 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-line/70 bg-cream">
          <div className="max-w-7xl mx-auto px-4 lg:px-10 py-3">
            <div className="flex items-center gap-3 bg-cream-card border border-line rounded-full px-4 py-2.5">
              <Search className="w-4 h-4 text-ink/50 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => handleQuery(e.target.value)}
                placeholder="Rechercher un plat : tajin, couscous, briwat…"
                className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink/40"
              />
              {query && (
                <button onClick={() => onQuery('')} aria-label="Effacer" className="text-ink/50 hover:text-ink">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-line/70 bg-cream px-4 py-2">
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 border-b border-line/60 last:border-0 text-ink font-medium"
            >
              {n.label}
            </a>
          ))}
          <Link href="/track" className="block py-3 text-amber-600 font-semibold">
            Suivre ma commande
          </Link>
        </nav>
      )}
    </header>
  );
}
