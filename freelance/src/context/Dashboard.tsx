import React, { createContext, useReducer, useContext } from "react"
import { Client, Project, Payment } from "../types/app"

type State = {
  clients: Client[]
  projects: Project[]
  payments: Payment[]
}

type Action =
  | { type: "MARK_PROJECT_PAID"; payload: string }

const initialState: State = {
  clients: [
    { id: "1", name: "Sarah", country: "Rwanda" },
    { id: "2", name: "Uwera", country: "Musanze" },
  ],
  projects: [
    { id: "101", clientId: "1", title: "Website Design", budget: 1000, status: "in-progress", paymentStatus: "unpaid" },
    { id: "102", clientId: "2", title: "Logo Creation", budget: 500, status: "completed", paymentStatus: "paid" },
  ],
  payments: [{ projectId: "102", amount: 500, date: "2025-11-01" }],
}

function dashboardReducer(state: State, action: Action): State {
  switch (action.type) {
    case "MARK_PROJECT_PAID":
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload ? { ...p, paymentStatus: "paid" } : p
        ),
      }
    default:
      return state
  }
}

const DashboardContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => {},
})

export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  )
}
