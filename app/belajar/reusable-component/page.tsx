'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import BelajarNav from '@/components/BelajarNav';
import TopicQuiz, { QuizQuestion } from '@/components/TopicQuiz';

const REUSABLE_QUIZ: QuizQuestion[] = [
  {
    question:
      'Apa tujuan utama membuat Reusable Component dalam pengembangan aplikasi React/Next.js?',
    options: [
      'Menambah ukuran file agar aplikasi terlihat besar',
      'Mencegah duplikasi kode (DRY) dan mempermudah pemeliharaan UI yang konsisten',
      'Menghapus penggunaan CSS dari seluruh website',
      'Membuat website berjalan tanpa internet',
    ],
    correctIndex: 1,
    explanation:
      'Reusable component memungkinkan kita menulis struktur UI dan logikanya 1 kali, lalu menggunakannya kembali di banyak tempat hanya dengan mengubah data input melalui `props`.',
  },
  {
    question:
      'Bagaimana cara komponen React menerima data atau konten kustom yang dibungkus di dalamnya (`<Card>Konten Disini</Card>`)?',
    options: [
      'Melalui prop khusus bernama `children`',
      'Melalui variabel global window',
      'Melalui localStorage browser',
      'Komponen React tidak bisa membungkus konten lain',
    ],
    correctIndex: 0,
    explanation:
      'Prop `children` adalah prop bawaan React yang secara otomatis menampung elemen atau teks apa pun yang diletakkan di antara tag pembuka dan penutup sebuah komponen.',
  },
];

export default function ReusableComponentDemo() {
  const [lastAction, setLastAction] = useState<string>('Belum ada aksi yang dipicu.');

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-start p-6 sm:p-12 overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <BelajarNav
        currentTopic="/belajar/reusable-component"
        topicTitle="Reusable Component & Props"
        topicBadge="Component Architecture"
        badgeColor="rose"
      />

      <div className="relative z-10 w-full max-w-5xl space-y-12">
        {/* Status Toast */}
        <div className="p-4 rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-transparent backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="text-zinc-400">Event Interaksi Terakhir:</span>
            <strong className="text-white font-mono">{lastAction}</strong>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            Props Event
          </span>
        </div>

        {/* Section 1: Button Variants */}
        <div className="p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Contoh 1: Komponen &lt;Button /&gt;
            </span>
            <h2 className="text-xl font-bold text-white mt-2">Variasi Props Tombol</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Satu file komponen yang sama menerima prop <code className="text-rose-400 font-mono">variant</code>, <code className="text-rose-400 font-mono">size</code>, dan <code className="text-rose-400 font-mono">onClick</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              label="Primary Action"
              variant="primary"
              onClick={() => setLastAction('Kamu mengklik tombol Primary (Emerald)')}
            />
            <Button
              label="Secondary Action"
              variant="secondary"
              onClick={() => setLastAction('Kamu mengklik tombol Secondary (Neutral)')}
            />
            <Button
              label="Danger Action"
              variant="danger"
              onClick={() => setLastAction('Kamu mengklik tombol Danger (Rose)')}
            />
            <Button
              label="Gradient Action"
              variant="gradient"
              onClick={() => setLastAction('Kamu mengklik tombol Gradient (Indigo/Purple)')}
            />
            <Button
              label="Small Button"
              size="sm"
              variant="secondary"
              onClick={() => setLastAction('Kamu mengklik tombol Small')}
            />
          </div>
        </div>

        {/* Section 2: Card Variants */}
        <div className="p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Contoh 2: Komponen &lt;Card /&gt; Fleksibel
            </span>
            <h2 className="text-xl font-bold text-white mt-2">Children & Custom Slots</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Komponen kartu menerima teks, emoji, badge, dan konten kustom lewat prop <code className="text-purple-400 font-mono">children</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card
              emoji="⚡"
              title="Performa Turbopack"
              description="Kompilasi super cepat dengan engine Turbopack bawaan Next.js 15."
              badge="Fast Build"
              gradient="purple"
            >
              <Button
                label="Pelajari Turbopack"
                variant="gradient"
                size="sm"
                onClick={() => setLastAction('Klik tombol dari dalam Card Turbopack')}
              />
            </Card>

            <Card
              emoji="🎨"
              title="Styling Fleksibel"
              description="Tailwind CSS v4 memungkinkan pembuatan UI modern dengan transisi mulus."
              badge="Modern CSS"
              gradient="emerald"
            >
              <Button
                label="Explore Theme"
                variant="primary"
                size="sm"
                onClick={() => setLastAction('Klik tombol dari dalam Card Styling')}
              />
            </Card>

            <Card
              emoji="🛡️"
              title="Keamanan Rute"
              description="Middleware berjalan di Edge server untuk validasi session instan."
              badge="Edge Security"
              gradient="amber"
            >
              <Button
                label="Cek Keamanan"
                variant="secondary"
                size="sm"
                onClick={() => setLastAction('Klik tombol dari dalam Card Keamanan')}
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <TopicQuiz
        topicId="reusable-component"
        topicTitle="Reusable Component & Props"
        color="rose"
        questions={REUSABLE_QUIZ}
      />
    </div>
  );
}
