import { SimulationProvider } from "./store/SimulationContext";
import AppLayout from "./components/AppLayout"
import Alert from "./components/Alert"




// Main App Component with Provider
const App = () => {
  return (
    <SimulationProvider>
      <Alert />
      <AppLayout />
    </SimulationProvider>
  );
};

export default App;
