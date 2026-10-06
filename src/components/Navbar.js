"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell } from "lucide-react"; // Notun Icon Library theke import

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const onPlan = path.startsWith("/my-plan");

  const navLink = (href, label, active) => (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 sm:px-4 text-[11px] sm:text-sm font-bold transition-colors ${
        active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 group">
          {/* Lucide React Dumbbell Icon */}
          <Dumbbell 
            strokeWidth={2.5} 
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.3)] transition-all group-hover:drop-shadow-[0_0_12px_rgba(204,255,0,0.8)]"
          />
          <span className="font-display text-sm sm:text-lg font-bold tracking-wider text-white transition-colors group-hover:text-[#ccff00]">
            FITLOG
          </span>
        </Link>
        
        {/* Middle: Links */}
        <div className="flex items-center gap-1">
          {navLink("/", "Workouts", !onPlan)}
          {navLink("/my-plan", "My Plan", onPlan)}
        </div>
        
        {/* Right: Counters */}
        <Link href="/my-plan" className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold uppercase text-zinc-400 hover:text-white">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden sm:inline">Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-black">
              {plan.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden sm:inline">Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-600 bg-transparent text-white">
              {saved.length}
            </span>
          </div>
        </Link>
        
      </nav>
    </header>
  );
}