type CardProps = {
  title: string;
  description: string;
  emoji?: string;
  badge?: string;
  gradient?: 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'default';
  children?: React.ReactNode;
};

export default function Card({
  title,
  description,
  emoji,
  badge,
  gradient = 'default',
  children,
}: CardProps) {
  const gradientBorders = {
    default: 'hover:border-zinc-400 dark:hover:border-zinc-600',
    purple: 'hover:border-purple-400/80 dark:hover:border-purple-500/80 hover:shadow-purple-500/10',
    blue: 'hover:border-sky-400/80 dark:hover:border-sky-500/80 hover:shadow-sky-500/10',
    emerald: 'hover:border-emerald-400/80 dark:hover:border-emerald-500/80 hover:shadow-emerald-500/10',
    amber: 'hover:border-amber-400/80 dark:hover:border-amber-500/80 hover:shadow-amber-500/10',
    rose: 'hover:border-rose-400/80 dark:hover:border-rose-500/80 hover:shadow-rose-500/10',
  };

  return (
    <div
      className={`group relative p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${gradientBorders[gradient]} flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {emoji && (
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-2xl shadow-inner border border-zinc-200/60 dark:border-zinc-700/50 group-hover:scale-110 transition-transform">
              {emoji}
            </div>
          )}
          {badge && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      {children && <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">{children}</div>}
    </div>
  );
}
