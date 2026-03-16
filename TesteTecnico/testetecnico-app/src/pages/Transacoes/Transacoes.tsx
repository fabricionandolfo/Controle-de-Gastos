import { useEffect, useState } from "react";
import { listarPessoas, type Pessoa } from "../../services/pessoaService";
import { listarCategorias, type Categoria } from "../../services/categoriaService";
import {
  criarTransacao,
  listarTransacoes,
  type Transacao,
} from "../../services/transacaoService";

function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("1");
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoaId, setPessoaId] = useState("");

  const carregarDados = async () => {
    try {
      const transacoesData = await listarTransacoes();
      setTransacoes(transacoesData);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }

    try {
      const pessoasData = await listarPessoas();
      setPessoas(pessoasData);
    } catch (error) {
      console.error("Erro ao carregar pessoas:", error);
    }

    try {
      const categoriasData = await listarCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const limparFormulario = () => {
    setDescricao("");
    setValor("");
    setTipo("1");
    setCategoriaId("");
    setPessoaId("");
  };

  const salvarTransacao = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await criarTransacao({
        descricao,
        valor: Number(valor),
        tipo: Number(tipo),
        categoriaId: Number(categoriaId),
        pessoaId: Number(pessoaId),
      });

      limparFormulario();
      await carregarDados();
    } catch (error: any) {
      console.error("Erro ao salvar transação:", error);

      const mensagem =
        error?.response?.data?.mensagem ||
        "Não foi possível salvar a transação.";

      alert(mensagem);
    }
  };

  const obterTextoTipo = (tipo: number) => {
    return tipo === 1 ? "Despesa" : "Receita";
  };

  const obterCorTipo = (tipo: number) => {
    if (tipo === 1) {
      return { background: "#fff3e0", color: "#ef6c00" };
    }

    return { background: "#e8f5e9", color: "#2e7d32" };
  };

  const totalTransacoes = transacoes.length;
  const totalReceitas = transacoes.filter((t) => t.tipo === 2).length;
  const totalDespesas = transacoes.filter((t) => t.tipo === 1).length;
  const valorMovimentado = transacoes.reduce((acc, item) => acc + item.valor, 0);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={tituloStyle}>Transações</h1>
        <p style={subtituloStyle}>
          Cadastre receitas e despesas vinculadas às pessoas e categorias.
        </p>
      </div>

      <div style={cardsGridStyle}>
        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Total de Transações</span>
          <strong style={cardValorStyle}>{totalTransacoes}</strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Receitas</span>
          <strong style={{ ...cardValorStyle, color: "#2e7d32" }}>
            {totalReceitas}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Despesas</span>
          <strong style={{ ...cardValorStyle, color: "#ef6c00" }}>
            {totalDespesas}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Valor Movimentado</span>
          <strong style={cardValorStyle}>
            {valorMovimentado.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </div>
      </div>

      <div style={formCardStyle}>
        <div style={formHeaderStyle}>
          <h2 style={formTituloStyle}>Nova Transação</h2>
          <span style={badgeStyle}>Cadastro</span>
        </div>

        <form onSubmit={salvarTransacao} style={formStyle}>
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
            <label style={labelStyle}>Valor</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={inputStyle}
              placeholder="Digite o valor"
              required
            />
          </div>

          <div style={campoStyle}>
            <label style={labelStyle}>Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={inputStyle}
            >
              <option value="1">Despesa</option>
              <option value="2">Receita</option>
            </select>
          </div>

          <div style={campoStyle}>
            <label style={labelStyle}>Categoria</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Selecione</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>

          <div style={campoStyle}>
            <label style={labelStyle}>Pessoa</label>
            <select
              value={pessoaId}
              onChange={(e) => setPessoaId(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Selecione</option>
              {pessoas.map((pessoa) => (
                <option key={pessoa.id} value={pessoa.id}>
                  {pessoa.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={acoesFormularioStyle}>
            <button type="submit" style={buttonPrimaryStyle}>
              Cadastrar
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
          <h2 style={tabelaTituloStyle}>Lista de Transações</h2>
          <span style={badgeStyle}>{transacoes.length} registro(s)</span>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Descrição</th>
                <th style={thStyle}>Valor</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Categoria</th>
                <th style={thStyle}>Pessoa</th>
              </tr>
            </thead>

            <tbody>
              {transacoes.map((transacao) => {
                const corTipo = obterCorTipo(transacao.tipo);

                return (
                  <tr key={transacao.id}>
                    <td style={tdPessoaStyle}>{transacao.descricao}</td>
                    <td style={tdStyle}>
                      {transacao.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          ...statusBadgeStyle,
                          backgroundColor: corTipo.background,
                          color: corTipo.color,
                        }}
                      >
                        {obterTextoTipo(transacao.tipo)}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {transacao.categoria?.descricao ?? transacao.categoriaId}
                    </td>
                    <td style={tdStyle}>
                      {transacao.pessoa?.nome ?? transacao.pessoaId}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {transacoes.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={5} style={emptyStateStyle}>
                    Nenhuma transação cadastrada até o momento.
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
  minWidth: "220px",
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

const emptyStateStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "24px",
  color: "#76638a",
  fontSize: "15px",
};

export default Transacoes;