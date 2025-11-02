import { useDashboard } from "../context/Dashboard"
import { Project} from "../types/app"

import { findClientById } from "../utils/ut"

interface Props {
  projects: Project[]
}

export default function ProjectList({ projects }: Props) {
  const { dispatch, state } = useDashboard()

  return (
    <div className="space-y-3">
      {projects.map(project => {
        const client = findClientById(state.clients, project.clientId)
        return (
          <div
            key={project.id}
            className="border p-3 rounded bg-gray-700 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm">
                Client: {client ? client.name : "Client not found"}
              </p>
              <p className="text-sm capitalize">Status: {project.status}</p>
              <p className="text-sm capitalize">
                Payment:{" "}
                <span
                  className={
                    project.paymentStatus === "paid"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {project.paymentStatus}
                </span>
              </p>
            </div>
            {project.paymentStatus === "unpaid" && (
              <button
                onClick={() =>
                  dispatch({ type: "MARK_PROJECT_PAID", payload: project.id })
                }
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
