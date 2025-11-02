import { useState } from "react"
import { DashboardProvider, useDashboard } from "./context/Dashboard"
import ClientList from "./component/ClientList"
import ProjectList from "./component/ProjectList"
import DashboardStats from "./component/DashboardStats"
import {filterProjects, searchClients, searchProjects} from "./utils/ut"
import PaymentList from "./component/PaymentList"

function ClientSection() {
  const { state } = useDashboard()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = searchTerm
    ? searchClients(state.clients, searchTerm)
    : state.clients

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Clients</h2>
      <input
        placeholder="Search client..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <ClientList key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}

function ProjectSection() {
  const { state } = useDashboard()
  const [statusFilter, setStatusFilter] = useState("")
  const [paymentFilter, setPaymentFilter] = useState<"paid" | "unpaid" | "">("")
  const [searchTerm, setSearchTerm] = useState("")

  let filtered = filterProjects(
    state.projects,
    statusFilter || undefined,
    paymentFilter || undefined
  )
  if (searchTerm) {
    filtered = searchProjects(filtered, searchTerm)
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Projects</h2>

      <div className="flex gap-3 mb-3">
        <input
          placeholder="Search project..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value as any)}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="">All Payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <ProjectList projects={filtered} />
    </div>
  )
}

export default function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Freelance Management Dashboard
        </h1>
        <DashboardStats />
        <ClientSection />
        <ProjectSection />
        <PaymentList/>
      </div>
    </DashboardProvider>
  )
}
