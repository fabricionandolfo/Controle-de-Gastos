namespace TesteTecnico.APP.Models
{
	public class TotalPessoaViewModel
	{
		public int PessoaId { get; set; }
		public string NomePessoa { get; set; } = string.Empty;
		public decimal TotalReceitas { get; set; }
		public decimal TotalDespesas { get; set; }
		public decimal Saldo { get; set; }
	}

	public class TotalGeralViewModel
	{
		public decimal TotalReceitas { get; set; }
		public decimal TotalDespesas { get; set; }
		public decimal SaldoLiquido { get; set; }
	}

	public class RelatorioPessoasResponseViewModel
	{
		public List<TotalPessoaViewModel> Pessoas { get; set; } = new();
		public TotalGeralViewModel TotalGeral { get; set; } = new();
	}

	public class DashboardViewModel
	{
		public int TotalPessoas { get; set; }
		public int TotalCategorias { get; set; }
		public int TotalTransacoes { get; set; }
		public decimal TotalReceitas { get; set; }
		public decimal TotalDespesas { get; set; }
		public decimal SaldoLiquido { get; set; }
		public List<TotalPessoaViewModel> PessoasResumo { get; set; } = new();
		public List<TransacaoViewModel> UltimasTransacoes { get; set; } = new();
	}
}