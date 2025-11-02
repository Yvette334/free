import { useDashboard } from "../context/Dashboard"
import { getClientById } from "../utils/ut"
import type { Project } from "../types/app"

export default function ProjectList({ projects }: { projects: Project[] }) {
  const { state, dispatch } = useDashboard()

  return (
    <div className="space-y-3">
      {projects.map(p => {
        const client = getClientById(state.clients, p.clientId)
        return (
          <div key={p.id} className="border p-3 rounded bg-gray-700 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p>Client: {client ? client.name : "Client not found"}</p>
              <p>Status: {p.status}</p>
              <p>
                Payment:{" "}
                <span className={p.paymentStatus === "paid" ? "text-green-400" : "text-red-400"}>
                  {p.paymentStatus}
                </span>
              </p>
            </div>
            {p.paymentStatus === "unpaid" && (
              <button
                onClick={() => dispatch({ type: "MARK_PROJECT_PAID", payload: p.id })}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Mark Paid
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
