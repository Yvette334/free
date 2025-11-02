import { useState } from "react"
import { DashboardProvider, useDashboard } from "./context/Dashboard"

import ClientCard from "./component/ClientList"
import ProjectList from "./component/ProjectList"
import DashboardStats from "./component/DashboardStats"
import { filterProjects } from "./utils/ut"

function ClientSection() {
  const { state } = useDashboard()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {state.clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
}

function FilteredProjectSection() {
  const { state } = useDashboard()
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [paymentFilter, setPaymentFilter] = useState<"paid" | "unpaid" | "">("")

  // Apply filter using utility
  const filteredProjects = filterProjects(
    state.projects,
    statusFilter || undefined,
    paymentFilter || undefined
  )

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="flex gap-4 mb-3">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={paymentFilter}
          onChange={e => setPaymentFilter(e.target.value as "paid" | "unpaid" | "")}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="">All Payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <ProjectList projects={filteredProjects} />
    </div>
  )
}

export default function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-900 text-white p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Freelance Management Dashboard
        </h1>

        <DashboardStats />
        <ClientSection />
        <FilteredProjectSection />
      </div>
    </DashboardProvider>
  )
}
