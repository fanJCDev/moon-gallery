export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-neutral-400 md:flex-row">
        <p className="font-display text-amber-200">Moon Gallery</p>
        <p>© {new Date().getFullYear()} — All works are original & one of a kind.</p>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" className="hover:text-amber-200">Instagram ↗</a>
          <a href="https://t.me" target="_blank" className="hover:text-amber-200">Telegram ↗</a>
        </div>
      </div>
    </footer>
  );
}