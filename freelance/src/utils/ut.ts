import type { Client, Project, Payment } from "../types/app"

// Count paid vs unpaid projects
export function countPaidVsUnpaid(projects: Project[]) {
  const paid = projects.filter(p => p.paymentStatus === "paid").length
  const unpaid = projects.filter(p => p.paymentStatus === "unpaid").length
  return { paid, unpaid }
}

// Find client by ID safely
export function getClientById(clients: Client[], id: string) {
  const found = clients.filter(c => c.id === id)
  return found.length > 0 ? found[0] : null
}

// Record a new payment (simple validation)
export function recordPayment(
  payments: Payment[],
  projects: Project[],
  newPayment: Payment
) {
  const projectExists = projects.some(p => p.id === newPayment.projectId)
  if (projectExists && newPayment.amount > 0 && newPayment.date) {
    payments.push(newPayment)
    return true
  } else {
    return false
  }
}

// Handle undefined/null safely
export function safeText(value?: string | null) {
  return value ? value : "Unknown"
}

// Filter projects by status or payment
export function filterProjects(
  projects: Project[],
  status?: string,
  paymentStatus?: "paid" | "unpaid"
) {
  return projects.filter(p => {
    const matchStatus = status ? p.status === status : true
    const matchPayment = paymentStatus ? p.paymentStatus === paymentStatus : true
    return matchStatus && matchPayment
  })
}

// Search clients or projects by name
export function searchClients(clients: Client[], term: string) {
  return clients.filter(c => c.name.toLowerCase().includes(term.toLowerCase()))
}

export function searchProjects(projects: Project[], term: string) {
  return projects.filter(p => p.title.toLowerCase().includes(term.toLowerCase()))
}

// Dashboard summary
export function dashboardStats(projects: Project[]) {
  const total = projects.length
  const { paid, unpaid } = countPaidVsUnpaid(projects)
  return { total, paid, unpaid }
}
