import { useDashboard } from "../context/Dashboard"
import { countPaidVsUnpaid } from "../utils/ut"

export default function DashboardStats() {
  const { state } = useDashboard()
  const { paid, unpaid } = countPaidVsUnpaid(state.projects)

  return (
    <div className="border p-4 bg-gray-800 text-white rounded-lg flex justify-around">
      <div>
        <h3 className="text-lg font-bold">Total Projects</h3>
        <p>{state.projects.length}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-green-400">Paid</h3>
        <p>{paid}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-red-400">Unpaid</h3>
        <p>{unpaid}</p>
      </div>
    </div>
  )
}
