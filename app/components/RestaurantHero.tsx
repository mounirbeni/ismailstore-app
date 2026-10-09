'use client';

import { ArrowRight, Star, Truck, Leaf, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const OPEN_H = 10, OPEN_M = 30;
const CLOSE_H = 21, CLOSE_M = 30;

function checkOpen(): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Casablanca',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());
  const h = parseInt(parts.find(p => p.type === 'hour')?.value ?? '0');
  const m = parseInt(parts.find(p => p.type === 'minute')?.value ?? '0');
  const t = h * 60 + m;
  return t >= OPEN_H * 60 + OPEN_M && t < CLOSE_H * 60 + CLOSE_M;
}

const STATS = [
  { Icon: Star, top: '4.8/5', bottom: '(312 avis)', filled: true },
  { Icon: Truck, top: 'Livraison rapide', bottom: 'à Marrakech' },
  { Icon: Leaf, top: 'Ingrédients frais', bottom: 'et de qualité' },
  { Icon: Heart, top: 'Cuisine traditionnelle', bottom: 'faite avec amour' },
];

export default function RestaurantHero() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(checkOpen());
    const id = setInterval(() => setOpen(checkOpen()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-white scroll-mt-20">
      {/* Dish photo */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[50%]">
        <img src="/images/tajin-poulet.jpg" alt="Tajin poulet citron" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/25 lg:via-espresso/35 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-10 pb-7 lg:pt-20 lg:pb-9">
        {/* Open / closed */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
            open ? 'bg-green-500/15 text-green-200 border-green-300/30' : 'bg-red-500/15 text-red-200 border-red-300/30'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          {open ? 'Ouvert · 10h30–21h30' : 'Fermé · Ouvre à 10h30'}
        </div>

        <h1 className="font-display font-medium text-[2.7rem] leading-[1.05] lg:text-[4.5rem] lg:leading-[1.02] mt-5 max-w-xl">
          Les saveurs
          <br />
          du Maroc,
          <br />
          <em className="text-[#e0794a] font-normal">chez vous</em>
        </h1>

        <p className="mt-5 lg:mt-6 text-white/85 text-sm lg:text-lg leading-relaxed max-w-[19rem] lg:max-w-md">
          Des plats marocains authentiques, préparés avec amour et livrés à Marrakech.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-black/30 active:scale-95"
          >
            Commander maintenant <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#categories"
            className="hidden sm:inline-flex items-center border border-white/60 hover:bg-white/10 transition-colors text-white font-medium text-sm px-6 py-3.5 rounded-full active:scale-95"
          >
            Voir le menu
          </a>
        </div>

        {/* Trust row */}
        <ul className="mt-9 lg:mt-14 grid grid-cols-4 lg:flex lg:items-center gap-2 lg:gap-0">
          {STATS.map(({ Icon, top, bottom, filled }, i) => (
            <li
              key={top}
              className={`flex flex-col lg:flex-row items-center lg:items-center text-center lg:text-left gap-1.5 lg:gap-3 ${
                i > 0 ? 'lg:border-l lg:border-white/20 lg:ml-7 lg:pl-7' : ''
              }`}
            >
              <Icon className={`w-6 h-6 lg:w-7 lg:h-7 flex-shrink-0 ${filled ? 'text-amber-400 fill-amber-400' : 'text-white'}`} strokeWidth={1.5} />
              <p className="text-[10px] lg:text-sm leading-tight text-white/80">
                <span className="block text-white font-medium lg:font-semibold">{top}</span>
                {bottom}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
