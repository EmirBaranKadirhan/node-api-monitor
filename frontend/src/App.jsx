import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonitorsList from "./pages/MonitorsList";
import MonitorDetail from "./pages/MonitorDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonitorsList />} />
        <Route path="/monitor/:id" element={<MonitorDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
