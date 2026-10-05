"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const onPlan = path.startsWith("/my-plan");

  const navLink = (href, label, active) => (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-xs font-bold sm:text-sm transition-colors ${
        active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="FitLog logo" className="h-6 w-6 object-contain" />
          <span className="font-display text-lg font-bold tracking-wider text-white">FITLOG</span>
        </Link>
        
        {/* Middle Links */}
        <div className="flex items-center gap-1">
          {navLink("/", "Workouts", !onPlan)}
          {navLink("/my-plan", "My Plan", onPlan)}
        </div>
        
        {/* Right Counters */}
        <Link href="/my-plan" className="flex items-center gap-4 text-xs font-bold uppercase text-zinc-400 hover:text-white">
          <div className="flex items-center gap-2">
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-black">
              {plan.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-600 bg-transparent text-white">
              {saved.length}
            </span>
          </div>
        </Link>
        
      </nav>
    </header>
  );
}