export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#09090b]">
      {/* Spinning Circle */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-[#ccff00]"></div>
      <p className="mt-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
        Loading Workouts...
      </p>
    </div>
  );
}