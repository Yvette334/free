export interface Client {
    id: string
    name: string
    country: string
}

export interface Project{
    id: string
    clientId: string
    title: string
    budget: number
    status: ProjectStatus;
    paymentStatus: PaymentStatus;
    
}

export interface Payment{
    projectId: string
    amount: number
    date: string
}

export type ProjectStatus = "pending" | "in-progress" | "completed";
export type PaymentStatus = "paid" | "unpaid";