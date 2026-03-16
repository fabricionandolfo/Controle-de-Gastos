import { useEffect, useState } from "react";
import {
  criarCategoria,
  listarCategorias,
  type Categoria,
} from "../../services/categoriaService";

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("1");

  const carregarCategorias = async () => {
    try {
      const dados = await listarCategorias();
      setCategorias(dados);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const salvarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await criarCategoria({
        descricao,
        finalidade: Number(finalidade),
      });

      setDescricao("");
      setFinalidade("1");
      await carregarCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Não foi possível salvar a categoria.");
    }
  };

  const obterTextoFinalidade = (finalidade: number) => {
    switch (finalidade) {
      case 1:
        return "Despesa";
      case 2:
        return "Receita";
      case 3:
        return "Ambas";
      default:
        return "Não informado";
    }
  };

  const obterCorFinalidade = (finalidade: number) => {
    switch (finalidade) {
      case 1:
        return { background: "#fff3e0", color: "#ef6c00" };
      case 2:
        return { background: "#e8f5e9", color: "#2e7d32" };
      case 3:
        return { background: "#ede7f6", color: "#6d3ea2" };
      default:
        return { background: "#f5f5f5", color: "#666" };
    }
  };

  const totalCategorias = categorias.length;
  const totalDespesa = categorias.filter((c) => c.finalidade === 1).length;
  const totalReceita = categorias.filter((c) => c.finalidade === 2).length;
  const totalAmbas = categorias.filter((c) => c.finalidade === 3).length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={tituloStyle}>Categorias</h1>
        <p style={subtituloStyle}>
          Cadastre e visualize as categorias utilizadas nas transações.
        </p>
      </div>

      <div style={cardsGridStyle}>
        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Total de Categorias</span>
          <strong style={cardValorStyle}>{totalCategorias}</strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Categorias de Despesa</span>
          <strong style={{ ...cardValorStyle, color: "#ef6c00" }}>
            {totalDespesa}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Categorias de Receita</span>
          <strong style={{ ...cardValorStyle, color: "#2e7d32" }}>
            {totalReceita}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Categorias Ambas</span>
          <strong style={{ ...cardValorStyle, color: "#6d3ea2" }}>
            {totalAmbas}
          </strong>
        </div>
      </div>

      <div style={formCardStyle}>
        <div style={formHeaderStyle}>
          <h2 style={formTituloStyle}>Nova Categoria</h2>
          <span style={badgeStyle}>Cadastro</span>
        </div>

        <form onSubmit={salvarCategoria} style={formStyle}>
          <div style={campoStyle}>
            <label style={labelStyle}>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={inputStyle}
              placeholder="Digite a descrição"
              required
            />
          </div>

          <div style={campoStyle}>
            <label style={labelStyle}>Finalidade</label>
            <select
              value={finalidade}
              onChange={(e) => setFinalidade(e.target.value)}
              style={inputStyle}
            >
              <option value="1">Despesa</option>
              <option value="2">Receita</option>
              <option value="3">Ambas</option>
            </select>
          </div>

          <div style={acoesFormularioStyle}>
            <button type="submit" style={buttonPrimaryStyle}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>

      <div style={tabelaCardStyle}>
        <div style={tabelaHeaderStyle}>
          <h2 style={tabelaTituloStyle}>Lista de Categorias</h2>
          <span style={badgeStyle}>{categorias.length} registro(s)</span>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Descrição</th>
                <th style={thStyle}>Finalidade</th>
              </tr>
            </thead>

            <tbody>
              {categorias.map((categoria) => {
                const corFinalidade = obterCorFinalidade(categoria.finalidade);

                return (
                  <tr key={categoria.id}>
                    <td style={tdPessoaStyle}>{categoria.descricao}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          ...statusBadgeStyle,
                          backgroundColor: corFinalidade.background,
                          color: corFinalidade.color,
                        }}
                      >
                        {obterTextoFinalidade(categoria.finalidade)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {categorias.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={2} style={emptyStateStyle}>
                    Nenhuma categoria cadastrada até o momento.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const tituloStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "34px",
  fontWeight: 800,
  color: "#2f2340",
};

const subtituloStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "15px",
  color: "#76638a",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
  gap: "18px",
};

const cardResumoStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "20px 22px",
  boxShadow: "0 10px 30px rgba(80, 44, 120, 0.08)",
  border: "1px solid #eee6f8",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#7e6a93",
  fontWeight: 600,
};

const cardValorStyle: React.CSSProperties = {
  fontSize: "28px",
  lineHeight: 1.1,
  color: "#2f2340",
};

const formCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "22px",
  boxShadow: "0 10px 30px rgba(80, 44, 120, 0.08)",
  border: "1px solid #eee6f8",
};

const formHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const formTituloStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "22px",
  color: "#2f2340",
};

const badgeStyle: React.CSSProperties = {
  background: "#f1e6ff",
  color: "#6d3ea2",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 700,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
  alignItems: "end",
  flexWrap: "wrap",
};

const campoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#6f5b86",
};

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  minWidth: "240px",
  borderRadius: "12px",
  border: "1px solid #ddd3eb",
  background: "#fcfbfe",
  outline: "none",
  fontSize: "14px",
};

const acoesFormularioStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
};

const buttonPrimaryStyle: React.CSSProperties = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "12px",
  background: "#6d3ea2",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const tabelaCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "22px",
  boxShadow: "0 10px 30px rgba(80, 44, 120, 0.08)",
  border: "1px solid #eee6f8",
};

const tabelaHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const tabelaTituloStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "22px",
  color: "#2f2340",
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: "auto",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "16px 14px",
  fontSize: "14px",
  color: "#6f5b86",
  borderBottom: "1px solid #ece4f6",
  background: "#faf7fd",
};

const tdStyle: React.CSSProperties = {
  padding: "16px 14px",
  borderBottom: "1px solid #f1ebf8",
  color: "#352846",
  fontSize: "15px",
};

const tdPessoaStyle: React.CSSProperties = {
  padding: "16px 14px",
  borderBottom: "1px solid #f1ebf8",
  color: "#2f2340",
  fontSize: "15px",
  fontWeight: 600,
};

const statusBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
};

const emptyStateStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "24px",
  color: "#76638a",
  fontSize: "15px",
};

export default Categorias;