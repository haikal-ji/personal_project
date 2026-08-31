import Link from 'next/link';
import BelajarNav from '@/components/BelajarNav';

const PRODUCTS = [
  { id: '1', name: 'Sepatu Futsal Pro', icon: '👟', price: 'Rp 450.000', tag: 'Footwear' },
  { id: '2', name: 'Bola Basket Match', icon: '🏀', price: 'Rp 280.000', tag: 'Balls' },
  { id: '3', name: 'Raket Badminton Light', icon: '🏸', price: 'Rp 590.000', tag: 'Rackets' },
];

export default function ProdukList() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/routing"
        topicTitle="Katalog Produk (Dynamic Routes)"
        topicBadge="Product Index"
        badgeColor="blue"
      />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-6">
        <p className="text-xs sm:text-sm text-zinc-400 text-center max-w-md">
          Pilih salah satu produk di bawah. Perhatikan URL di address bar browser berubah secara instan tanpa reload halaman penuh:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/belajar/routing/produk/${product.id}`}
              className="group p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900/90 hover:border-blue-500/50 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center shadow-lg hover:shadow-blue-500/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                {product.icon}
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 mb-2">
                ID: #{product.id}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-400 mt-1">{product.price}</p>
              
              <span className="text-[11px] text-zinc-500 mt-3 group-hover:text-blue-400 font-medium transition-colors">
                Lihat Detail →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex gap-4 text-xs">
          <Link
            href="/belajar/routing/produk/999"
            className="px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            🧪 Test Dynamic 404 (ID: 999)
          </Link>
        </div>
      </div>
    </div>
  );
}
