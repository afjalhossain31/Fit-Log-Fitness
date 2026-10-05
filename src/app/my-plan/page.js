"use client";
import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("Duration");
  const { plan, setPlan, saved, setSaved } = usePlan();

  const currentList = activeTab === "plan" ? plan : saved;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + Number(item.duration || 0), 0);
  const totalCalories = currentList.reduce((acc, item) => acc + Number(item.calories || 0), 0);

  const handleRemove = (id) => {
    if (activeTab === "plan") {
      setPlan(plan.filter((item) => (item._id || item.id) !== id));
    } else {
      setSaved(saved.filter((item) => (item._id || item.id) !== id));
    }
    toast.success("Workout removed");
  };

  const handleMarkDone = (id) => {
    if (activeTab === "plan") {
      setPlan(plan.filter((item) => (item._id || item.id) !== id));
      toast.success("Great job! Workout marked as done 👏");
    }
  };

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "Duration") return Number(b.duration) - Number(a.duration);
    if (sortBy === "Calories") return Number(b.calories) - Number(a.calories);
    if (sortBy === "Rating") return Number(b.rating) - Number(a.rating);
    return 0;
  });

  return (
    // Ekhane max-w-[1000px] er bodole max-w-6xl deya hoyeche jeno Navbar er sathe perfectly mile jay
    <main className="mx-auto w-full max-w-6xl px-4 py-12 min-h-screen flex flex-col items-start">
      
      {/* Header */}
      <div className="mb-8 w-full text-left">
        <h1 className="font-display text-4xl font-black uppercase tracking-wide text-white">MY PLAN</h1>
        <p className="mt-2 text-sm text-zinc-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Box */}
      <div className="mb-10 flex w-full flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-zinc-800 bg-[#121214] p-6 sm:p-8">
        <div className="flex-1 text-left w-full sm:w-auto mb-4 sm:mb-0">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Exercises</span>
          <span className="text-4xl font-black text-[#ccff00] sm:text-5xl">{totalExercises}</span>
        </div>
        <div className="flex-1 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-8 text-left w-full sm:w-auto mb-4 sm:mb-0">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Minutes</span>
          <span className="text-4xl font-black text-white sm:text-5xl">{totalMinutes}</span>
        </div>
        <div className="flex-1 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-8 text-left w-full sm:w-auto">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Calories</span>
          <span className="text-4xl font-black text-white sm:text-5xl">{totalCalories}</span>
        </div>
      </div>

      {/* Controls Row: Tabs & Sort */}
      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        
        {/* Tabs */}
        <div className="flex rounded-lg border border-zinc-800 bg-[#09090b] p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-6 py-2 text-xs font-bold transition-colors ${
              activeTab === "plan" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-6 py-2 text-xs font-bold transition-colors ${
              activeTab === "saved" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-[#121214] px-4 py-2 pr-8 text-xs font-bold text-white outline-none hover:border-zinc-700 focus:border-[#ccff00] focus:ring-0"
            >
              <option value="Duration" className="bg-zinc-900">Duration</option>
              <option value="Calories" className="bg-zinc-900">Calories</option>
              <option value="Rating" className="bg-zinc-900">Rating</option>
            </select>
            {/* Custom Arrow for select */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* List / Empty State */}
      <div className="w-full border-t border-zinc-800/50 pt-6">
        {sortedList.length === 0 ? (
          
          /* Dashed Empty State Box */
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24 text-center bg-[#09090b]">
            <h2 className="mb-2 text-xl font-black uppercase text-white">NOTHING HERE YET</h2>
            <p className="mb-6 text-sm text-zinc-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="rounded-full bg-[#ccff00] px-8 py-3 text-xs font-bold text-black transition hover:scale-105 hover:bg-[#b3e600]">
              Go to workouts
            </Link>
          </div>

        ) : (
          <div className="space-y-4 w-full">
            {sortedList.map((workout) => (
              <div key={workout._id || workout.id} className="flex flex-col items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-[#121214] p-4 sm:flex-row pr-5">
                
                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                    <img src={workout.imageUrl || workout.image} alt={workout.workoutName} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black uppercase text-white mb-1">{workout.workoutName}</h3>
                    <p className="text-[11px] text-zinc-500 mb-2">{workout.equipment}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-zinc-400">
                      <span className="flex items-center gap-1">⏱ {workout.duration} min</span>
                      <span className="flex items-center gap-1">🔥 {workout.calories} kcal</span>
                      <span className="flex items-center gap-1">⭐ {workout.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                  <Link href={`/workout/${workout._id || workout.id}`} className="text-xs font-bold text-zinc-400 transition hover:text-white border border-zinc-700 px-4 py-2 rounded-full">
                    View Details
                  </Link>
                  {activeTab === "plan" && (
                    <button onClick={() => handleMarkDone(workout._id || workout.id)} className="flex items-center gap-1 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#b3e600]">
                      <span>✔</span> Mark as Done
                    </button>
                  )}
                  <button onClick={() => handleRemove(workout._id || workout.id)} className="text-lg text-zinc-500 transition hover:text-red-500 ml-2">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}