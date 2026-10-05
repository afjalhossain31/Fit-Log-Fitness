"use client";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

export default function ActionButtons({ workout }) {
  const { plan, setPlan, saved, setSaved } = usePlan();

  const addToPlan = () => {
    if (plan.length >= 5) {
      toast.error("Cap of five lifts for today reached!");
      return;
    }
    if (plan.find((item) => (item._id || item.id) === (workout._id || workout.id))) {
      toast.error("Already in today's plan!");
      return;
    }
    setPlan([...plan, workout]);
    toast.success("Added to today's plan");
  };

  const saveForLater = () => {
    if (saved.find((item) => (item._id || item.id) === (workout._id || workout.id))) {
      toast.error("Already saved for later!");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button 
        onClick={addToPlan} 
        className="flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-bold text-black transition hover:bg-[#b3e600] w-full sm:w-auto"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        Add to today's plan
      </button>
      <button 
        onClick={saveForLater} 
        className="flex items-center justify-center gap-2 rounded-full border border-zinc-600 bg-transparent px-6 py-3 text-xs font-bold text-white transition hover:bg-zinc-800 w-full sm:w-auto"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        Save for later
      </button>
    </div>
  );
}