import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Home() {
  // 1. API Theke Data Fetch kora
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store" // Always get fresh data
  });
  const data = await res.json();

  return (
    <main className="min-h-screen">
      <Hero />

      <section id="library" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-wide md:text-3xl">
            THE LIBRARY
          </h2>
          <p className="text-sm text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* 2. Grid Setup (Mobile e 1, Tablet e 2, Desktop e 3 Column) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((workout, index) => (
            <WorkoutCard 
              key={workout.id || workout._id || index} 
              workout={workout} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}