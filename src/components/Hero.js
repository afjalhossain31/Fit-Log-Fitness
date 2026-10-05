import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col-reverse items-center justify-between gap-8 rounded-2xl bg-[#18181b] p-8 md:flex-row md:p-12">
        <div className="flex-1 space-y-5">
          <span className="text-xs font-bold tracking-widest text-[#ccff00]">WORKOUT LIBRARY</span>
          <h1 className="font-display text-4xl font-black uppercase leading-tight tracking-wide md:text-5xl lg:text-6xl">
            Train with intent. <br /> Log every set.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <Link
            href="#library"
            className="inline-block rounded-md bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            BROWSE WORKOUTS
          </Link>
        </div>
        
        <div className="flex-1 shrink-0">
          {/* Local banner image add kora hoyeche */}
          <img 
            src="/assets/banner.png" 
            alt="Gym Banner" 
            className="w-full max-w-sm rounded-xl object-contain drop-shadow-2xl md:ml-auto"
          />
        </div>
      </div>
    </section>
  );
}