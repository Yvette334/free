import type { Client } from "../types/app"
interface Props {
  client: Client
}

export default function ClientList({ client }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-gray-800 text-white">
      <h2 className="font-bold text-lg">{client.name}</h2>
      <p>{client.country}</p>
      {client.email && <p className="text-sm text-gray-400">{client.email}</p>}
    </div>
  )
}
