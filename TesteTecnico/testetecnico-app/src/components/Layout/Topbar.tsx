function Topbar() {
  return (
    <header style={topbarStyle}>
      <div>
        <h1 style={pageTitleStyle}>Dashboard</h1>
        <p style={pageSubtitleStyle}>Visão geral do sistema</p>
      </div>

      <div style={actionsStyle}>
        <input
          type="text"
          placeholder="Pesquisar..."
          style={searchInputStyle}
        />

        <button style={iconButtonStyle}>🔔</button>
        <div style={avatarStyle}>FB</div>
      </div>
    </header>
  );
}

const topbarStyle: React.CSSProperties = {
  background: "#ffffff",
  
  padding: "18px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 8px 24px rgba(80, 44, 120, 0.06)",
  borderBottom: "1px solid #eee6f8",
  marginBottom: "24px",
};

const pageTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "20px",
  color: "#2f2340",
  fontWeight: 800,
};

const pageSubtitleStyle: React.CSSProperties = {
  margin: "4px 0 0 0",
  fontSize: "13px",
  color: "#7b6a90",
};

const actionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const searchInputStyle: React.CSSProperties = {
  width: "260px",
  padding: "11px 14px",
  borderRadius: "999px",
  border: "1px solid #ddd3eb",
  background: "#faf7fd",
  outline: "none",
  fontSize: "14px",
};

const iconButtonStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  background: "#f1e6ff",
  color: "#6d3ea2",
  cursor: "pointer",
  fontSize: "16px",
};

const avatarStyle: React.CSSProperties = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "#c99cf0",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  boxShadow: "0 6px 16px rgba(109, 62, 162, 0.22)",
};

export default Topbar;