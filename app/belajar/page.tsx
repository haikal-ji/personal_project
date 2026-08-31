import Link from 'next/link';

const TOPICS = [
  {
    href: '/belajar/use-state',
    title: 'useState',
    tag: 'State Management',
    desc: 'Menyimpan & memperbarui data lokal komponen secara reaktif.',
    color: 'emerald',
    icon: '⚡',
    features: ['Counter interaktif', 'Input terkontrol', 'Re-render otomatis'],
  },
  {
    href: '/belajar/server-client',
    title: 'Server vs Client',
    tag: 'Rendering Architecture',
    desc: 'Perbedaan fundamental komponen yang di-render di server vs browser.',
    color: 'indigo',
    icon: '🌐',
    features: ['Zero JS di browser', 'Hydration & Interactivity', 'Akses DB aman'],
  },
  {
    href: '/belajar/use-effect',
    title: 'useEffect',
    tag: 'Lifecycle & Side Effects',
    desc: 'Menjalankan timer, fetching data, & sinkronisasi dengan browser.',
    color: 'purple',
    icon: '🔄',
    features: ['Dependency array [] & [state]', 'Cleanup function', 'Fetch data client-side'],
  },
  {
    href: '/belajar/rahasia',
    title: 'Middleware & Auth',
    tag: 'Edge Routing & Security',
    desc: 'Intercept request sebelum sampai ke halaman untuk proteksi rute.',
    color: 'amber',
    icon: '🛡️',
    features: ['Proteksi cookie login', 'Redirect otomatis', 'Edge processing'],
  },
  {
    href: '/belajar/routing',
    title: 'Routing & Dynamic Routes',
    tag: 'Navigation System',
    desc: 'Sistem rute berbasis folder dan parameter dinamis URL.',
    color: 'blue',
    icon: '🧭',
    features: ['Folder-based routing', 'Dynamic [id] params', 'Next/Link instant transition'],
  },
  {
    href: '/belajar/reusable-component',
    title: 'Reusable Component',
    tag: 'Component Design',
    desc: 'Membangun UI modular dengan props yang fleksibel & hemat kode.',
    color: 'rose',
    icon: '🧩',
    features: ['Props-driven UI', 'Customizable variants', 'Compound components'],
  },
];

export default function BelajarHub() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="relative z-10 w-full max-w-5xl text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-zinc-900/90 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Next.js 15 & React 19 Interactive Lab
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Eksplorasi Konsep Modern Web
        </h1>
        
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Pahami 6 pilar penting dalam pengembangan aplikasi web modern dengan demo interaktif langsung, penjelasan konsep, dan visualisasi arsitektur.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Grid of Topics */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {TOPICS.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="group relative p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-emerald-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {topic.icon}
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                  {topic.tag}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                {topic.title}
              </h2>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {topic.desc}
              </p>

              {/* Feature bullet points */}
              <ul className="mt-4 space-y-1.5">
                {topic.features.map((feature, i) => (
                  <li key={i} className="text-[11px] text-zinc-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/70 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors">
              <span>Buka Demo Interaktif</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Summary Reference Card */}
      <div className="relative z-10 w-full max-w-5xl p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span>💡</span> Ringkasan Cepat Arsitektur
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Kapan harus menggunakan masing-masing teknologi di Next.js App Router:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <p className="font-semibold text-emerald-400 mb-1">State & Interaction</p>
            <p className="text-zinc-400 leading-relaxed">
              Gunakan <code className="text-zinc-200 font-mono">useState</code> & <code className="text-zinc-200 font-mono">useEffect</code> saat membutuhkan event handler (<code className="text-zinc-200">onClick</code>), timer, atau animasi interaktif di sisi klien.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <p className="font-semibold text-indigo-400 mb-1">Data & Security</p>
            <p className="text-zinc-400 leading-relaxed">
              Gunakan <code className="text-zinc-200 font-mono">Server Component</code> untuk fetching data cepat tanpa JavaScript berlebih di browser dan mengamankan credentials API.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <p className="font-semibold text-amber-400 mb-1">Routing & Guard</p>
            <p className="text-zinc-400 leading-relaxed">
              Manfaatkan <code className="text-zinc-200 font-mono">middleware.ts</code> untuk proteksi halaman/autentikasi dan folder <code className="text-zinc-200 font-mono">[id]</code> untuk rute dinamis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
