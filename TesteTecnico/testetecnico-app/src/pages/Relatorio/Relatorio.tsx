import { useEffect, useState } from "react";
import { obterRelatorioPessoas } from "../../services/relatorioService";

type PessoaRelatorio = {
  pessoaId: number;
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
};

type TotalGeral = {
  totalReceitas: number;
  totalDespesas: number;
  saldoLiquido: number;
};

type RelatorioResponse = {
  pessoas: PessoaRelatorio[];
  totalGeral: TotalGeral;
};

function Relatorio() {
  const [dados, setDados] = useState<RelatorioResponse | null>(null);

  useEffect(() => {
    const carregarRelatorio = async () => {
      try {
        const resultado = await obterRelatorioPessoas();
        setDados(resultado);
      } catch (error) {
        console.error("Erro ao carregar relatório:", error);
      }
    };

    carregarRelatorio();
  }, []);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const obterCorSaldo = (valor: number) => {
    if (valor < 0) return "#c62828";
    if (valor > 0) return "#2e7d32";
    return "#5f5f5f";
  };

  if (!dados) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={tituloStyle}>Relatório por Pessoa</h1>
          <p style={subtituloStyle}>Carregando dados do relatório...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={tituloStyle}>Relatório por Pessoa</h1>
        <p style={subtituloStyle}>
          Acompanhe receitas, despesas e saldo consolidado por pessoa.
        </p>
      </div>

      <div style={cardsGridStyle}>
        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Total de Receitas</span>
          <strong style={{ ...cardValorStyle, color: "#2e7d32" }}>
            {formatarMoeda(dados.totalGeral.totalReceitas)}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Total de Despesas</span>
          <strong style={{ ...cardValorStyle, color: "#c62828" }}>
            {formatarMoeda(dados.totalGeral.totalDespesas)}
          </strong>
        </div>

        <div style={cardResumoStyle}>
          <span style={cardLabelStyle}>Saldo Líquido</span>
          <strong
            style={{
              ...cardValorStyle,
              color: obterCorSaldo(dados.totalGeral.saldoLiquido),
            }}
          >
            {formatarMoeda(dados.totalGeral.saldoLiquido)}
          </strong>
        </div>
      </div>

      <div style={tabelaCardStyle}>
        <div style={tabelaHeaderStyle}>
          <h2 style={tabelaTituloStyle}>Detalhamento</h2>
          <span style={badgeStyle}>{dados.pessoas.length} pessoa(s)</span>
        </div>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Pessoa</th>
                <th style={thStyle}>Receitas</th>
                <th style={thStyle}>Despesas</th>
                <th style={thStyle}>Saldo</th>
              </tr>
            </thead>

            <tbody>
              {dados.pessoas.map((pessoa) => (
                <tr key={pessoa.pessoaId}>
                  <td style={tdPessoaStyle}>{pessoa.nomePessoa}</td>
                  <td style={tdStyle}>{formatarMoeda(pessoa.totalReceitas)}</td>
                  <td style={tdStyle}>{formatarMoeda(pessoa.totalDespesas)}</td>
                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: 700,
                      color: obterCorSaldo(pessoa.saldo),
                    }}
                  >
                    {formatarMoeda(pessoa.saldo)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td style={tdFooterStyle}>Total Geral</td>
                <td style={tdFooterStyle}>
                  {formatarMoeda(dados.totalGeral.totalReceitas)}
                </td>
                <td style={tdFooterStyle}>
                  {formatarMoeda(dados.totalGeral.totalDespesas)}
                </td>
                <td
                  style={{
                    ...tdFooterStyle,
                    color: obterCorSaldo(dados.totalGeral.saldoLiquido),
                  }}
                >
                  {formatarMoeda(dados.totalGeral.saldoLiquido)}
                </td>
              </tr>
            </tfoot>
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

const badgeStyle: React.CSSProperties = {
  background: "#f1e6ff",
  color: "#6d3ea2",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: 700,
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

const tdFooterStyle: React.CSSProperties = {
  padding: "18px 14px",
  background: "#faf7fd",
  color: "#2f2340",
  fontSize: "15px",
  fontWeight: 800,
  borderTop: "2px solid #e7daf6",
};

export default Relatorio;