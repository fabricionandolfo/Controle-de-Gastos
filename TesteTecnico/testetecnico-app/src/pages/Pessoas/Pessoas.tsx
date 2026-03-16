import { useEffect, useState } from "react";
import {
  criarPessoa,
  excluirPessoa,
  listarPessoas,
  atualizarPessoa,
  type Pessoa,
} from "../../services/pessoaService";

function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const carregarPessoas = async () => {
    try {
      const dados = await listarPessoas();
      setPessoas(dados);
    } catch (error) {
      console.error("Erro ao carregar pessoas:", error);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const limparFormulario = () => {
    setNome("");
    setIdade("");
    setEditandoId(null);
  };

  const salvarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        nome,
        idade: Number(idade),
      };

      if (editandoId) {
        await atualizarPessoa(editandoId, payload);
      } else {
        await criarPessoa(payload);
      }

      limparFormulario();
      await carregarPessoas();
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
      alert("Não foi possível salvar a pessoa.");
    }
  };

  const editarPessoa = (pessoa: Pessoa) => {
    setNome(pessoa.nome);
    setIdade(String(pessoa.idade));
    setEditandoId(pessoa.id);
  };

  const removerPessoa = async (id: number) => {
    const confirmou = window.confirm("Deseja realmente excluir esta pessoa?");
    if (!confirmou) return;

    try {
      await excluirPessoa(id);
      await carregarPessoas();
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
      alert("Não foi possível excluir a pessoa.");
    }
  };

  const totalPessoas = pessoas.length;
  const totalMaiores = pessoas.filter((p) => p.idade >= 18).length;
  const totalMenores = pessoas.filter((p) => p.idade < 18).length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={tituloStyle}>Pessoas</h1>
        <p style={subtituloStyle}>
          Cadastre, edite e gerencie as pessoas vinculadas ao controle de gastos.
        </p>
      </div>

      <div style={cardsGridStyle}>
        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Total de Pessoas</span>
          <strong style={cardValorStyle}>{totalPessoas}</strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Maiores de Idade</span>
          <strong style={{ ...cardValorStyle, color: "#2e7d32" }}>
            {totalMaiores}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Menores de Idade</span>
          <strong style={{ ...cardValorStyle, color: "#ef6c00" }}>
            {totalMenores}
          </strong>
        </div>
      </div>

      <div style={formCardStyle}>
        <div style={formHeaderStyle}>
          <h2 style={formTituloStyle}>
            {editandoId ? "Editar Pessoa" : "Nova Pessoa"}
          </h2>
          <span style={badgeStyle}>
            {editandoId ? "Modo edição" : "Cadastro"}
          </span>
        </div>

        <form onSubmit={salvarPessoa} style={formStyle}>
          <div style={campoStyle}>
            <label style={labelStyle}>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={inputStyle}
              placeholder="Digite o nome"
              required
            />
          </div>

          <div style={campoStyle}>
            <label style={labelStyle}>Idade</label>
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              style={inputStyle}
              placeholder="Digite a idade"
              required
            />
          </div>

          <div style={acoesFormularioStyle}>
            <button type="submit" style={buttonPrimaryStyle}>
              {editandoId ? "Atualizar" : "Cadastrar"}
            </button>

            <button
              type="button"
              onClick={limparFormulario}
              style={buttonSecondaryStyle}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div style={tabelaCardStyle}>
        <div style={tabelaHeaderStyle}>
          <h2 style={tabelaTituloStyle}>Lista de Pessoas</h2>
          <span style={badgeStyle}>{pessoas.length} registro(s)</span>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Idade</th>
                <th style={thStyle}>Situação</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td style={tdPessoaStyle}>{pessoa.nome}</td>
                  <td style={tdStyle}>{pessoa.idade}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        ...statusBadgeStyle,
                        backgroundColor:
                          pessoa.idade < 18 ? "#fff3e0" : "#e8f5e9",
                        color: pessoa.idade < 18 ? "#ef6c00" : "#2e7d32",
                      }}
                    >
                      {pessoa.idade < 18 ? "Menor de idade" : "Maior de idade"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={acoesTabelaStyle}>
                      <button
                        onClick={() => editarPessoa(pessoa)}
                        style={buttonSmallStyle}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removerPessoa(pessoa.id)}
                        style={buttonDangerStyle}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {pessoas.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={4} style={emptyStateStyle}>
                    Nenhuma pessoa cadastrada até o momento.
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
  gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
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

const buttonSecondaryStyle: React.CSSProperties = {
  padding: "12px 18px",
  border: "1px solid #d8c9ec",
  borderRadius: "12px",
  background: "#fff",
  color: "#4b2a63",
  cursor: "pointer",
  fontWeight: 600,
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

const acoesTabelaStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
};

const buttonSmallStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1px solid #d8c9ec",
  borderRadius: "10px",
  background: "#fff",
  color: "#4b2a63",
  cursor: "pointer",
  fontWeight: 600,
};

const buttonDangerStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "10px",
  background: "#d32f2f",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};

const emptyStateStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "24px",
  color: "#76638a",
  fontSize: "15px",
};

export default Pessoas;