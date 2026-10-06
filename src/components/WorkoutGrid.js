"use client";
import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutGrid({ initialWorkouts }) {
  // Prothome 12 ti card dekhabe
  const [visible, setVisible] = useState(12);

  // Trick: API theke 12 ti data ashle, amra setake duplicate kore 24 ti baniye nicchi test korar jonno!
  const allWorkouts = initialWorkouts.length === 12 
    ? [...initialWorkouts, ...initialWorkouts.map(item => ({ ...item, _id: item._id + "_copy" }))] 
    : initialWorkouts;

  const handleSeeMore = () => {
    setVisible(prev => prev + 12);
  };

  return (
    <div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allWorkouts.slice(0, visible).map((workout) => (
          <WorkoutCard key={workout._id || workout.id} workout={workout} />
        ))}
      </div>

      {/* See More Button */}
      {visible < allWorkouts.length && (
        <div className="mt-12 flex items-center justify-center">
          <button
            onClick={handleSeeMore}
            className="rounded-full bg-[#ccff00] px-10 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:bg-[#b3e600] shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            See More Workouts
          </button>
        </div>
      )}
    </div>
  );
}