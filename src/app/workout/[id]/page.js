import ActionButtons from "./ActionButtons";

export default async function WorkoutDetails({ params }) {
  // Error fix: Next.js 15 e params ke await korte hoy
  const { id } = await params;
  
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store"
  });
  const workout = await res.json();

  if (!workout || workout.error) {
    return <div className="py-20 text-center text-xl font-bold text-zinc-400">Workout not found!</div>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        
        {/* Left Side: Image */}
        <div className="w-full">
          <img 
            src={workout.imageUrl || workout.image} 
            alt={workout.workoutName} 
            className="w-full rounded-3xl object-cover aspect-square bg-zinc-800" 
          />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-black uppercase text-white mb-2">
            {workout.workoutName}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400 mb-5">
            {workout.description || "A compound exercise that builds muscle thickness, strength, and power."}
          </p>

          {/* Categories / Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workout.category?.map((cat, i) => (
              <span key={i} className="rounded-full bg-[#ccff00] px-4 py-1 text-[10px] font-bold uppercase text-black">
                {cat}
              </span>
            ))}
          </div>

          {/* Key Specs Table */}
          <div className="mb-6 rounded-2xl border border-zinc-800 bg-[#121214] p-5">
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Equipment</span>
              <span className="text-xs font-medium text-white">{workout.equipment}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Difficulty</span>
              <span className="text-xs font-medium text-white">{workout.difficulty || "Intermediate"}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Sets</span>
              <span className="text-xs font-medium text-white">{workout.sets || "4"}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Reps</span>
              <span className="text-xs font-medium text-white">{workout.reps || "6-8"}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Duration</span>
              <span className="text-xs font-medium text-white">{workout.duration} min</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Calories</span>
              <span className="text-xs font-medium text-white">{workout.calories} kcal</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Rating</span>
              <span className="text-xs font-medium text-white">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-white">Instructions</h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              {workout.instructions?.map((step, i) => (
                <li key={i} className="flex gap-4 leading-relaxed">
                  <span className="font-bold text-white">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <ActionButtons workout={workout} />
        </div>
      </div>
    </main>
  );
}