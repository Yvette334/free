import { useDashboard } from "../context/Dashboard"

export default function PaymentList() {
  const { state } = useDashboard()
  return (
    <div className="border p-4 bg-gray-800 rounded text-white">
      <h3 className="font-bold mb-2">Payments</h3>
      {state.payments.map((p, i) => (
        <div key={i} className="border-b border-gray-700 py-1">
          <p>Project: {p.projectId}</p>
          <p>Amount: ${p.amount}</p>
          <p>Date: {p.date}</p>
        </div>
      ))}
    </div>
  )
}
