'use client';

import { useState, useEffect } from 'react';
import SiteHeader from '@/app/components/SiteHeader';
import RestaurantHero from '@/app/components/RestaurantHero';
import CategoryShowcase from '@/app/components/CategoryShowcase';
import CategoryTabs from '@/app/components/CategoryTabs';
import MenuSection from '@/app/components/MenuSection';
import InfoSection from '@/app/components/InfoSection';
import CartButton from '@/app/components/CartButton';
import CartDrawer from '@/app/components/CartDrawer';
import CheckoutModal from '@/app/components/CheckoutModal';
import ProductModal from '@/app/components/ProductModal';
import FreeDeliveryBanner from '@/app/components/FreeDeliveryBanner';
import { useCart } from '@/app/context/CartContext';
import { MenuItem, Category, menuItems as staticItems, categories as staticCats } from '@/app/data/menu';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(staticItems);
  const [categories, setCategories] = useState<Category[]>(staticCats);
  const { state, dispatch } = useCart();

  useEffect(() => {
    fetch('/api/menu')
      .then(r => r.json())
      .then(data => {
        setMenuItems(data.items);
        setCategories([
          { id: 'all', name: 'Tout', icon: 'all', count: data.items.length },
          ...data.categories,
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader query={query} onQuery={setQuery} />
      <RestaurantHero />
      <CategoryShowcase categories={categories} onSelect={id => { setQuery(''); setActiveCategory(id); }} />

      <section id="menu" className="scroll-mt-16 lg:scroll-mt-[72px] mt-8 lg:mt-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 pb-4">
          <h2 className="font-display text-2xl lg:text-4xl text-ink font-medium">Notre menu</h2>
          <p className="text-ink/55 text-sm mt-1.5">Cuisinés frais chaque jour, livrés chauds à votre porte.</p>
        </div>
        <CategoryTabs active={activeCategory} onSelect={id => { setQuery(''); setActiveCategory(id); }} categories={categories} />
        <MenuSection activeCategory={activeCategory} menuItems={menuItems} query={query} />
      </section>

      <InfoSection />

      <CartButton />
      <CartDrawer />

      {/* Free delivery popup */}
      <FreeDeliveryBanner />

      {/* Shared modals */}
      <ProductModal />
      <CheckoutModal
        isOpen={state.isCheckoutOpen}
        onClose={() => dispatch({ type: 'SET_CHECKOUT_OPEN', payload: false })}
      />
    </main>
  );
}
