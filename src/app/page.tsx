import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#fafafa] flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-4xl md:text-6xl text-amber-300 font-bold mb-4 font-display">MOON GALLERY</h1>
      <p className="text-zinc-400 max-w-md mb-8">به گالری رسمی آثار نقاشی خوش آمدید.</p>
      
      {/* منوی ناوبری مستقیم صفحه اصلی */}
      <nav className="flex flex-col sm:flex-row gap-6 text-lg">
        <Link href="/gallery" className="text-zinc-300 hover:text-amber-300 transition duration-300 border border-zinc-800 px-6 py-3 rounded-lg bg-zinc-900/50">
          مشاهده گالری آثار
        </Link>
        <Link href="/about" className="text-zinc-300 hover:text-amber-300 transition duration-300 border border-zinc-800 px-6 py-3 rounded-lg bg-zinc-900/50">
          درباره من
        </Link>
        <Link href="/contact" className="text-zinc-300 hover:text-amber-300 transition duration-300 border border-zinc-800 px-6 py-3 rounded-lg bg-zinc-900/50">
          تماس با ما
        </Link>
      </nav>
    </div>
  );
}
