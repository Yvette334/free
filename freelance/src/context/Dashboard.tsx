import React, { createContext, useReducer, ReactNode } from "react";
import  { Client, Project, Payment } from "../types/app";


type State = {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
};

// 🧠 Define the possible actions
type Action =
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string } };

// ⚙️ Reducer function — controls how state changes
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] };

    case "MARK_PROJECT_PAID":
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId ? { ...p, paymentStatus: "paid" } : p
        ),
      };

    default:
      return state;
  }
}

// 🧩 Create the context
const DashboardContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// 🧱 Initial data (example)
const initialState: State = {
  clients: [
    { id: "1", name: "Alice", country: "Kenya" },
    { id: "2", name: "Bob", country: "USA" },
  ],
  projects: [
    { id: "p1", clientId: "1", title: "Website Design", budget: 500, status: "completed", paymentStatus: "paid" },
    { id: "p2", clientId: "2", title: "Mobile App", budget: 1000, status: "in-progress", paymentStatus: "unpaid" },
  ],
  payments: [
    { projectId: "p1", amount: 500, date: "2025-11-01" },
  ],
};

// 🧭 Context Provider
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardContext;
