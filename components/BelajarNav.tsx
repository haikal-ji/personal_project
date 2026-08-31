import Link from 'next/link';

interface BelajarNavProps {
  currentTopic?: string;
  topicTitle?: string;
  topicBadge?: string;
  badgeColor?: string;
}

const TOPICS = [
  { href: '/belajar/use-state', label: 'useState', color: 'emerald' },
  { href: '/belajar/server-client', label: 'Server vs Client', color: 'indigo' },
  { href: '/belajar/use-effect', label: 'useEffect', color: 'purple' },
  { href: '/belajar/rahasia', label: 'Middleware', color: 'amber' },
  { href: '/belajar/routing', label: 'Routing', color: 'blue' },
  { href: '/belajar/reusable-component', label: 'Reusable Component', color: 'rose' },
];

export default function BelajarNav({
  currentTopic,
  topicTitle,
  topicBadge = 'Interactive Demo',
  badgeColor = 'purple',
}: BelajarNavProps) {
  return (
    <header className="w-full max-w-5xl mb-8">
      {/* Top bar with back link and quick topics */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
        <Link
          href="/belajar"
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-black dark:hover:text-white transition-all shadow-xs"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Hub
        </Link>

        {/* Quick topic switcher pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
          {TOPICS.map((topic) => {
            const isActive = currentTopic === topic.href;
            return (
              <Link
                key={topic.href}
                href={topic.href}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                }`}
              >
                {topic.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {topicTitle && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              <span className={`w-1.5 h-1.5 rounded-full bg-${badgeColor}-500 animate-pulse`} />
              {topicBadge}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-zinc-900 dark:text-white">
              {topicTitle}
            </h1>
          </div>
        </div>
      )}
    </header>
  );
}
