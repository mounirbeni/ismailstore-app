'use client';

import { useState } from 'react';
import { Plus, Minus, Star, Sparkles, Leaf, Flame, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MenuItem } from '@/app/data/menu';
import { useCart } from '@/app/context/CartContext';
import CategoryIcon from './CategoryIcon';

interface Props {
  item: MenuItem;
}

const badgeConfig: Record<string, { label: string; className: string; Icon: LucideIcon }> = {
  popular:    { label: 'Populaire',  className: 'bg-amber-100 text-amber-700',  Icon: Star },
  new:        { label: 'Nouveau',    className: 'bg-blue-100 text-blue-700',    Icon: Sparkles },
  vegetarian: { label: 'Végétarien', className: 'bg-green-100 text-green-700',  Icon: Leaf },
  spicy:      { label: 'Épicé',      className: 'bg-red-100 text-red-700',      Icon: Flame },
};

const RESTAURANT_PHONE = '212693493661';

const categoryGradients: Record<string, string> = {
  tajins:   'from-amber-400 to-orange-500',
  salads:   'from-green-400 to-emerald-500',
  briwat:   'from-yellow-400 to-amber-500',
  couscous: 'from-orange-400 to-red-500',
};

export default function MenuCard({ item }: Props) {
  const { state, dispatch } = useCart();
  const cartItem = state.items.find(i => i.id === item.id);
  const qty = cartItem?.quantity ?? 0;
  const [imgError, setImgError] = useState(false);

  const badge = item.badge ? badgeConfig[item.badge] : null;
  const gradient = categoryGradients[item.category] ?? 'from-gray-400 to-gray-500';
  const hasImage = item.image && !imgError;

  function openDetail() {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: item });
  }

  return (
    <div
      className="relative flex items-center gap-3.5 p-3 rounded-3xl bg-cream-card border border-line shadow-[0_2px_14px_rgba(120,70,30,0.07)] hover:shadow-[0_6px_22px_rgba(120,70,30,0.13)] cursor-pointer active:scale-[0.99] transition-all"
      onClick={openDetail}
    >
      {/* Image */}
      <div className="flex-shrink-0">
        <div className={`w-[92px] h-[92px] rounded-2xl overflow-hidden shadow-sm ${!hasImage ? `bg-gradient-to-br ${gradient} flex items-center justify-center` : ''}`}>
          {hasImage ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <CategoryIcon category={item.category} className="w-10 h-10 text-white opacity-80" />
          )}
        </div>

      </div>

      {/* Text side */}
      <div className="flex-1 min-w-0 pl-1">
        {badge && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mb-1.5 ${badge.className}`}>
            <badge.Icon className="w-3 h-3" />
            {badge.label}
          </span>
        )}
        <h3 className="font-display font-semibold text-ink text-base leading-snug">{item.name}</h3>
        <p className="text-ink/55 text-xs mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
        {item.customOrder
          ? <p className="text-green-600 font-semibold text-xs mt-2">Contactez l&apos;équipe pour personnaliser</p>
          : <p className="text-amber-600 font-bold text-base mt-2">{item.price} DH</p>
        }
      </div>

      {/* Add control */}
      <div className="flex-shrink-0 self-end">
        {item.customOrder ? (
          <a
            href={`https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(`Bonjour, je souhaite commander "${item.name}" et avoir des informations sur les options et le prix.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-9 h-9 rounded-full bg-green-500 shadow-lg shadow-green-200 flex items-center justify-center active:scale-90 transition-transform"
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </a>
        ) : qty === 0 ? (
          <button
            onClick={e => {
              e.stopPropagation();
              dispatch({ type: 'ADD_ITEM', payload: item });
            }}
            className="w-9 h-9 rounded-full bg-amber-500 shadow-lg shadow-amber-300/60 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        ) : (
          <div
            className="flex items-center gap-1 bg-amber-500 rounded-full px-2 py-1.5 shadow-lg shadow-amber-300/60"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: qty - 1 } })}
              className="w-5 h-5 flex items-center justify-center active:scale-90 transition-transform"
            >
              <Minus className="w-3 h-3 text-white" />
            </button>
            <span className="text-white text-xs font-black w-4 text-center tabular-nums">{qty}</span>
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
              className="w-5 h-5 flex items-center justify-center active:scale-90 transition-transform"
            >
              <Plus className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
