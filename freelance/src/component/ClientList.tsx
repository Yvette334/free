import type { Client } from "../types/app"

export default function ClientList({ client }: { client: Client }) {
  return (
    <div className="border rounded p-3 bg-gray-800 text-white">
      <h3 className="font-bold">{client.name}</h3>
      <p>{client.country}</p>
      {client.email && <p className="text-sm text-gray-400">{client.email}</p>}
    </div>
  )
}
