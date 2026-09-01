'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CommandItem {
  id: string;
  title: string;
  category: 'Materi Belajar' | 'Navigasi Umum' | 'Aksi';
  desc: string;
  icon: string;
  href?: string;
  keywords?: string[];
  action?: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS: CommandItem[] = [
    {
      id: 'hub',
      title: 'Lab Belajar Hub',
      category: 'Navigasi Umum',
      desc: 'Halaman ringkasan semua 6 pilar materi Next.js & React',
      icon: '🚀',
      href: '/belajar',
      keywords: ['hub', 'lab', 'materi', 'daftar'],
    },
    {
      id: 'home',
      title: 'Beranda Utama',
      category: 'Navigasi Umum',
      desc: 'Kembali ke halaman utama website',
      icon: '🏠',
      href: '/',
      keywords: ['home', 'root', 'landing'],
    },
    {
      id: 'use-state',
      title: 'useState (State Management)',
      category: 'Materi Belajar',
      desc: 'Reaktivitas counter, form input, dan update state lokal',
      icon: '⚡',
      href: '/belajar/use-state',
      keywords: ['usestate', 'state', 'counter', 'reactive', 'hook'],
    },
    {
      id: 'server-client',
      title: 'Server vs Client Component',
      category: 'Materi Belajar',
      desc: 'Perbedaan render di server vs hidrasi interaktif di browser',
      icon: '🌐',
      href: '/belajar/server-client',
      keywords: ['server', 'client', 'rsc', 'hydration', 'database'],
    },
    {
      id: 'use-effect',
      title: 'useEffect (Side Effects & Lifecycle)',
      category: 'Materi Belajar',
      desc: 'Dependency array, cleanup function, timer & data fetching',
      icon: '🔄',
      href: '/belajar/use-effect',
      keywords: ['useeffect', 'effect', 'lifecycle', 'timer', 'fetch', 'dependency'],
    },
    {
      id: 'rahasia',
      title: 'Middleware & Route Protection',
      category: 'Materi Belajar',
      desc: 'Intercept request, auth guard, dan cookie authentication',
      icon: '🛡️',
      href: '/belajar/rahasia',
      keywords: ['middleware', 'auth', 'cookie', 'security', 'guard', 'rahasia'],
    },
    {
      id: 'routing',
      title: 'Routing & Dynamic Routes',
      category: 'Materi Belajar',
      desc: 'Folder-based routing dan dynamic [id] parameter URL',
      icon: '🧭',
      href: '/belajar/routing',
      keywords: ['routing', 'router', 'dynamic', 'url', 'param', 'link'],
    },
    {
      id: 'reusable-component',
      title: 'Reusable Component & Props',
      category: 'Materi Belajar',
      desc: 'Modular UI design dengan Button, Card, dan variasi Props',
      icon: '🧩',
      href: '/belajar/reusable-component',
      keywords: ['component', 'props', 'button', 'card', 'reusable', 'variant'],
    },
    {
      id: 'reset-progress',
      title: 'Reset Progress Belajar',
      category: 'Aksi',
      desc: 'Hapus semua checklist dan kuis tersimpan di browser',
      icon: '🗑️',
      action: () => {
        if (confirm('Reset semua progress materi belajar?')) {
          localStorage.removeItem('belajar_completed_topics');
          window.dispatchEvent(new Event('belajar_progress_updated'));
          alert('Progress berhasil di-reset!');
        }
      },
      keywords: ['reset', 'clear', 'hapus', 'ulang'],
    },
  ];

  // Filter commands
  const filteredCommands = COMMANDS.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const inTitle = cmd.title.toLowerCase().includes(q);
    const inDesc = cmd.desc.toLowerCase().includes(q);
    const inKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
    return inTitle || inDesc || inKeywords;
  });

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open_command_palette', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open_command_palette', handleOpenEvent);
    };
  }, []);

  // Reset index & focus input when open
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Adjust selection bounds when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to close */}
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
      />

      {/* Dialog box */}
      <div className="relative w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900/95 text-zinc-100 shadow-2xl overflow-hidden backdrop-blur-xl z-10 flex flex-col">
        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
          <span className="text-zinc-400 text-sm">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari materi atau perintah... (contoh: state, router, props)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-hidden"
          />
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-800/40">
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center text-xs text-zinc-500">
              Tidak ada hasil yang cocok dengan &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'hover:bg-zinc-800/60 text-zinc-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-white truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] text-emerald-400 font-mono shrink-0 pl-2">
                      ↵ Enter
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-zinc-800 px-1 py-0.5 rounded text-[10px] text-zinc-300">
                ↑
              </kbd>{' '}
              <kbd className="bg-zinc-800 px-1 py-0.5 rounded text-[10px] text-zinc-300">
                ↓
              </kbd>{' '}
              Navigasi
            </span>
            <span>
              <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-300">
                ↵
              </kbd>{' '}
              Buka
            </span>
          </div>
          <span>
            Tekan <kbd className="bg-zinc-800 px-1 py-0.5 rounded text-[10px] text-zinc-300">Ctrl + K</kbd> kapan saja
          </span>
        </div>
      </div>
    </div>
  );
}
