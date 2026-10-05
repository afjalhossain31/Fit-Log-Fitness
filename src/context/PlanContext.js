"use client";

import { createContext, useContext, useState } from "react";

// Create the context
const PlanContext = createContext();

// Export the PlanProvider (This is what layout.js is looking for)
export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  return (
    <PlanContext.Provider value={{ plan, setPlan, saved, setSaved }}>
      {children}
    </PlanContext.Provider>
  );
}

// Export the custom hook (This is what Navbar.js is looking for)
export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}