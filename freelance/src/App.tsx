import { DashboardProvider } from "./context/Dashboard";
import Dashboard from "./component/Dashboard";

export default function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}
