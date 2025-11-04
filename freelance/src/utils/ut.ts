import type { Client, Project} from "../types/app"

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

