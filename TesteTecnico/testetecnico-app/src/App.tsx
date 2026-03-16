import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Layout/Menu";
import Topbar from "./components/Layout/Topbar";
import Relatorio from "./pages/Relatorio/Relatorio";
import Pessoas from "./pages/Pessoas/Pessoas";
import Categorias from "./pages/Categorias/Categorias";
import Transacoes from "./pages/Transacoes/Transacoes";

function App() {
  return (
    <BrowserRouter>
      <div style={layoutStyle}>
        <Menu />

        <div style={contentWrapperStyle}>
          <Topbar />

          <main style={mainStyle}>
            <Routes>
              <Route path="/" element={<Relatorio />} />
              <Route path="/pessoas" element={<Pessoas />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/transacoes" element={<Transacoes />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

const layoutStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  background: "#f7f4fb",
};

const contentWrapperStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const mainStyle: React.CSSProperties = {
  padding: "0 24px 24px 24px",
  flex: 1,
};

export default App;