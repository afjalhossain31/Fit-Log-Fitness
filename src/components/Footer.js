import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-zinc-800/50 bg-[#09090b] pt-12 pb-8">
      <div className="mx-auto w-full max-w-6xl px-4">
        
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/logo.png" 
                alt="FitLog logo" 
                className="h-6 w-6 object-contain drop-shadow-[0_0_8px_rgba(204,255,0,0.3)] transition-all group-hover:drop-shadow-[0_0_12px_rgba(204,255,0,0.8)]" 
              />
              <span className="font-display text-lg font-black tracking-widest text-white transition-colors group-hover:text-[#ccff00]">
                FITLOG
              </span>
            </Link>
            <p className="text-xs font-medium text-zinc-500">
              Train with intent. Log every set.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            <Link href="/" className="transition-colors hover:text-[#ccff00]">Library</Link>
            <Link href="/my-plan" className="transition-colors hover:text-[#ccff00]">My Plan</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#ccff00]">
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/50 pt-6 sm:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            © {new Date().getFullYear()} FitLog. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span className="cursor-pointer transition-colors hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer transition-colors hover:text-white">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}