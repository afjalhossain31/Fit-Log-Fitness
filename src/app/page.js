"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { Search } from "lucide-react"; // Search icon import kora holo

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(true);

  // Search & Filter er jonno notun state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
          cache: "no-store",
        });
        const data = await res.json();
        
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

  // Filtering Logic (Search Box o Button er jonno)
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.workoutName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          workout.equipment?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // API te "equipment" er upor vitti kore filter kora
    const matchesFilter = activeFilter === "All" || workout.equipment?.toLowerCase().includes(activeFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const handleSeeMore = () => {
    setVisible((prev) => prev + 12);
  };

  // Filter Button er List
  const filters = ["All", "Dumbbell", "Barbell", "Bodyweight", "Machine"];

  return (
    <main className="min-h-screen">
      <Hero />

      <section id="library" className="mx-auto max-w-6xl px-4 py-12">
        
        {/* Header & Search Bar Section */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wide md:text-3xl text-white">
              THE LIBRARY
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Twenty-four lifts covering every major muscle group.
            </p>
          </div>

          {/* Premium Search Box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search workouts or equipment..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisible(12); // Kichu search korle abar prothom theke dekhabe
              }}
              className="w-full rounded-full border border-zinc-800 bg-[#121214] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.1)]"
            />
          </div>
        </div>

        {/* Filter Tags (Pills) */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setVisible(12); 
              }}
              className={`rounded-full border px-5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 ${
                activeFilter === filter
                  ? "border-[#ccff00] bg-[#ccff00] text-black shadow-[0_0_8px_rgba(204,255,0,0.3)]"
                  : "border-zinc-800 bg-[#121214] text-zinc-400 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-[#ccff00]"></div>
          </div>
        ) : filteredWorkouts.length === 0 ? (
          
          /* Kichu khuje na pele Empty State */
          <div className="py-20 text-center">
            <p className="text-lg font-bold text-zinc-500">No workouts found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveFilter("All");}}
              className="mt-4 rounded-full border border-zinc-700 px-6 py-2 text-xs font-bold text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              Clear Filters
            </button>
          </div>

        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredWorkouts.slice(0, visible).map((workout) => (
                <WorkoutCard 
                  key={workout.id || workout._id} 
                  workout={workout} 
                />
              ))}
            </div>

            {/* See More Button */}
            {visible < filteredWorkouts.length && (
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