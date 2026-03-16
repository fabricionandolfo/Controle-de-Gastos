import { Link, useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside style={sidebarStyle}>
      <div>
        <div style={brandBoxStyle}>
          <div style={logoStyle}>CG</div>
          <div>
            <h2 style={tituloStyle}>Controle de Gastos</h2>
            <p style={subtituloStyle}>Controle geral</p>
          </div>
        </div>

        <nav style={navStyle}>
          <Link to="/" style={isActive("/") ? activeLinkStyle : linkStyle}>
            Relatório
          </Link>

          <Link
            to="/pessoas"
            style={isActive("/pessoas") ? activeLinkStyle : linkStyle}
          >
            Pessoas
          </Link>

          <Link
            to="/categorias"
            style={isActive("/categorias") ? activeLinkStyle : linkStyle}
          >
            Categorias
          </Link>

          <Link
            to="/transacoes"
            style={isActive("/transacoes") ? activeLinkStyle : linkStyle}
          >
            Transações
          </Link>
        </nav>
      </div>

      
    </aside>
  );
}

const sidebarStyle: React.CSSProperties = {
  width: "270px",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #d289e0 0%, #b889ea 100%)",
  padding: "24px 18px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRight: "1px solid rgba(255,255,255,0.35)",
};

const brandBoxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "30px",
  padding: "8px 6px",
};

const logoStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.28)",
  color: "#3c2456",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  fontSize: "16px",
  backdropFilter: "blur(6px)",
};

const tituloStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "15px",
  fontWeight: 800,
  color: "#2f2340",
  lineHeight: 1.05,
};

const subtituloStyle: React.CSSProperties = {
  margin: "2px 0 0 0",
  color: "#5d437c",
  fontSize: "14px",
  fontWeight: 600,
};

const navStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#40275d",
  padding: "14px 16px",
  borderRadius: "14px",
  fontWeight: 700,
  background: "rgba(255,255,255,0.18)",
  transition: "all 0.2s ease",
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  background: "#ffffff",
  color: "#4f2f74",
  boxShadow: "0 8px 18px rgba(95, 50, 140, 0.12)",
};



export default Menu;