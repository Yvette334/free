import { useContext } from "react";
import DashboardContext from "../context/Dashboard";

export default function Dashboard() {
  const context = useContext(DashboardContext);
  if (!context) return null; // Safety check

  const { state, dispatch } = context;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Freelance Dashboard</h1>

      <h2 className="text-2xl font-semibold mb-2">Clients</h2>
      <ul className="mb-6">
        {state.clients.map(c => (
          <li key={c.id}>
            {c.name} — {c.country}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Projects</h2>
      <ul>
        {state.projects.map(p => (
          <li key={p.id} className="mb-2">
            {p.title} — {p.status} — {p.paymentStatus}
            {p.paymentStatus === "unpaid" && (
              <button
                className="ml-3 px-3 py-1 bg-green-500 rounded"
                onClick={() => dispatch({ type: "MARK_PROJECT_PAID", payload: { projectId: p.id } })}
              >
                Mark as Paid
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
