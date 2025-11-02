import type { Client, Project } from "../types/app"

export function countPaidVsUnpaid(projects: Project[]) {
  const paid = projects.filter(p => p.paymentStatus === "paid").length
  const unpaid = projects.filter(p => p.paymentStatus === "unpaid").length
  return { paid, unpaid }
}

export function findClientById(clients: Client[], id: string) {
  return clients.find(c => c.id === id) || null
}

export function filterProjectsByStatus(projects: Project[], status: string) {
  return projects.filter(p => p.status === status)
}

// New: filter projects by payment status ("paid" | "unpaid")
export function filterProjectsByPaymentStatus(
  projects: Project[],
  paymentStatus: "paid" | "unpaid"
) {
  return projects.filter(p => p.paymentStatus === paymentStatus)
}

// New: filter projects by both status and payment
export function filterProjects(
  projects: Project[],
  status?: string,
  paymentStatus?: "paid" | "unpaid"
) {
  return projects.filter(p => {
    const statusMatch = status ? p.status === status : true
    const paymentMatch = paymentStatus ? p.paymentStatus === paymentStatus : true
    return statusMatch && paymentMatch
  })
}

export function searchClients(clients: Client[], term: string) {
  return clients.filter(c =>
    c.name.toLowerCase().includes(term.toLowerCase())
  )
}
