import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      
      {/* Icon Area */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900/50 border border-zinc-800 shadow-[0_0_30px_rgba(204,255,0,0.05)]">
        <Dumbbell 
          className="h-12 w-12 text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.4)]" 
          strokeWidth={2} 
        />
      </div>

      {/* 404 Text Content */}
      <h1 className="font-display text-7xl font-black tracking-widest text-white md:text-9xl">
        404
      </h1>
      
      <h2 className="mt-4 text-xl font-bold uppercase tracking-widest text-zinc-300 md:text-2xl">
        Page Not Found
      </h2>
      
      <p className="mt-4 max-w-md text-sm font-medium text-zinc-500 md:text-base">
        Looks like you missed a rep or wandered into the wrong gym. The workout page you are looking for doesn't exist.
      </p>

      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="mt-10 rounded-full bg-[#ccff00] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-[#b3e600] shadow-[0_0_15px_rgba(204,255,0,0.2)]"
      >
        Return to Library
      </Link>
      
    </main>
  );
}