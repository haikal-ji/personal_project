import Link from 'next/link';
import { notFound } from 'next/navigation';
import BelajarNav from '@/components/BelajarNav';

const PRODUCTS: Record<
  string,
  { name: string; desc: string; price: string; icon: string; stock: number; rating: number }
> = {
  '1': {
    name: 'Sepatu Futsal Pro',
    desc: 'Sepatu ringan berteknologi grip canggih untuk kontrol bola maksimal di lapangan vinyl & rumput sintetis.',
    price: 'Rp 450.000',
    icon: '👟',
    stock: 14,
    rating: 4.9,
  },
  '2': {
    name: 'Bola Basket Match',
    desc: 'Bola resmi standar pertandingan internasional dengan bahan komposit kulit empuk & mantap saat dribble.',
    price: 'Rp 280.000',
    icon: '🏀',
    stock: 22,
    rating: 4.8,
  },
  '3': {
    name: 'Raket Badminton Light',
    desc: 'Frame aerodinamis berbahan high-modulus carbon graphite, sangat responsif untuk smash dan smash kilat.',
    price: 'Rp 590.000',
    icon: '🏸',
    stock: 8,
    rating: 5.0,
  },
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS[id];

  if (!product) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/routing"
        topicTitle={`Detail Produk: ${product.name}`}
        topicBadge={`Dynamic Param [id] = ${id}`}
        badgeColor="blue"
      />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        <div className="w-full p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 via-zinc-900/80 to-zinc-900/90 backdrop-blur-md shadow-2xl shadow-blue-500/5">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-4xl shadow-inner">
              {product.icon}
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold block mb-1">
                Dynamic Route: [id] = {id}
              </span>
              <span className="text-xs font-mono text-zinc-400">Rating: ⭐ {product.rating}</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-2">{product.name}</h2>
          <p className="text-xl font-extrabold text-emerald-400 mb-4">{product.price}</p>
          
          <p className="text-xs text-zinc-300 leading-relaxed mb-6 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
            {product.desc}
          </p>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-4 border-t border-zinc-800">
            <span>Stok Tersedia: <strong className="text-white">{product.stock} pcs</strong></span>
            <span className="text-emerald-400 font-semibold">Siap Dikirim</span>
          </div>
        </div>

        <Link
          href="/belajar/routing/produk"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 transition-colors"
        >
          ← Kembali ke Katalog Produk
        </Link>
      </div>
    </div>
  );
}
