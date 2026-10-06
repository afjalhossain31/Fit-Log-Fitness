"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [visible, setVisible] = useState(12); // Prothome 12 ta dekhabe
  const [loading, setLoading] = useState(true);

  // 1. API Theke Data Fetch kora
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
          cache: "no-store", // Always get fresh data
        });
        const data = await res.json();
        
        // 🛠️ KEY ERROR FIX: Original ebong Copy dutor moddhei id unique kora hoyeche
        const duplicatedData = data.length === 12 
          ? [
              ...data, 
              ...data.map((item, index) => ({ 
                ...item, 
                id: item.id ? `${item.id}_copy_${index}` : undefined,
                _id: item._id ? `${item._id}_copy_${index}` : `copy_${index}` 
              }))
            ] 
          : data;

        setWorkouts(duplicatedData);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleSeeMore = () => {
    setVisible((prev) => prev + 12);
  };

  return (
    <main className="min-h-screen">
      <Hero />

      <section id="library" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-wide md:text-3xl text-white">
            THE LIBRARY
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Twenty-four lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-[#ccff00]"></div>
          </div>
        ) : (
          <>
            {/* 📱 RESPONSIVE GRID: Mobile e 1, Tablet e 2, Desktop e 4 Column (Image er moto) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {workouts.slice(0, visible).map((workout) => (
                <WorkoutCard 
                  key={workout.id || workout._id} 
                  workout={workout} 
                />
              ))}
            </div>

            {/* See More Button */}
            {visible < workouts.length && (
              <div className="mt-12 flex items-center justify-center">
                <button
                  onClick={handleSeeMore}
                  className="rounded-full bg-[#ccff00] px-10 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-[#b3e600] shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                >
                  See More Workouts
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}