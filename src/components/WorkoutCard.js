import Link from "next/link";

export default function WorkoutCard({ workout }) {
  // Fallback if workout is undefined
  if (!workout) return null;

  return (
    <Link href={`/workout/${workout._id || workout.id}`} className="group flex flex-col rounded-xl bg-[#18181b] overflow-hidden transition-all hover:ring-2 hover:ring-[#ccff00]">
      {/* Image */}
      <div className="relative h-48 w-full bg-zinc-800">
        <img 
          src={workout.imageUrl || workout.image} 
          alt={workout.workoutName || workout.title || "Workout"} 
          className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
        />
      </div>
      
      {/* Details */}
      <div className="flex flex-col p-4 flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Ekhane `?.` deya hoyeche jate undefined hole error na dey */}
          {workout.category?.map((cat, index) => (
            <span key={index} className="rounded bg-[#ccff00] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold uppercase text-white mb-1">
          {workout.workoutName || workout.title}
        </h3>
        <p className="text-xs text-zinc-400 mb-4">{workout.equipment}</p>
        
        {/* Stats */}
        <div className="mt-auto flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800 pt-3">
          <span className="flex items-center gap-1">⏱ {workout.duration} min</span>
          <span className="flex items-center gap-1">🔥 {workout.calories} kcal</span>
          <span className="flex items-center gap-1">⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}