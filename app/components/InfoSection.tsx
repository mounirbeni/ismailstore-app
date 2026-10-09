import { Clock, MapPin, MessageCircle, Truck, ChefHat, Package } from 'lucide-react';
import Link from 'next/link';

const PHONE = '212693493661';

export default function InfoSection() {
  return (
    <footer className="mt-4 bg-espresso text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-16 grid gap-8 lg:grid-cols-3">
        <div id="apropos" className="scroll-mt-24">
          <ChefHat className="w-7 h-7 text-[#e0794a]" strokeWidth={1.5} />
          <h3 className="font-display text-2xl mt-3">À propos</h3>
          <p className="text-white/75 text-sm leading-relaxed mt-3">
            Yed Lmiima prépare une cuisine marocaine traditionnelle à Marrakech : tajins, couscous, briwat et salades,
            cuisinés avec des ingrédients frais et des épices choisies.
          </p>
        </div>

        <div id="livraison" className="scroll-mt-24">
          <Truck className="w-7 h-7 text-[#e0794a]" strokeWidth={1.5} />
          <h3 className="font-display text-2xl mt-3">Livraison</h3>
          <ul className="text-white/75 text-sm leading-relaxed mt-3 space-y-2">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/50" /> Livraison gratuite à Marrakech
            </li>
            <li className="flex items-center gap-2">
              <Package className="w-4 h-4 text-white/50" /> Commande minimum : 50 DH
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/50" /> Tous les jours, 10h30 – 21h30
            </li>
          </ul>
          <Link href="/track" className="inline-block mt-4 text-sm text-[#e0794a] hover:underline">
            Suivre ma commande →
          </Link>
        </div>

        <div id="contact" className="scroll-mt-24">
          <MessageCircle className="w-7 h-7 text-[#e0794a]" strokeWidth={1.5} />
          <h3 className="font-display text-2xl mt-3">Contact</h3>
          <p className="text-white/75 text-sm leading-relaxed mt-3">Une question, une commande spéciale ? Écrivez-nous sur WhatsApp.</p>
          <a
            href={`https://wa.me/${PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-amber-500 hover:bg-amber-600 transition-colors text-white font-semibold text-sm px-5 py-3 rounded-full"
          >
            <MessageCircle className="w-4 h-4" /> +212 693 493 661
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Yed Lmiima · Cuisine marocaine à Marrakech
      </div>
    </footer>
  );
}
