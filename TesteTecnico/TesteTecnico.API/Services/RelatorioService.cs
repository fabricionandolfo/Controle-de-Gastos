using TesteTecnico.API.DTOs;
using TesteTecnico.API.Repositories.Interfaces;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Services
{
	public class RelatorioService : IRelatorioService
	{
		private readonly IRelatorioRepositorio _relatorioRepositorio;

		public RelatorioService(IRelatorioRepositorio relatorioRepositorio)
		{
			_relatorioRepositorio = relatorioRepositorio;
		}

		public async Task<ApiResponse> ObterTotaisPorPessoaAsync()
		{
			var pessoas = await _relatorioRepositorio.ObterTotaisPorPessoaAsync();

			var totalGeral = new TotalGeralDto
			{
				TotalReceitas = pessoas.Sum(p => p.TotalReceitas),
				TotalDespesas = pessoas.Sum(p => p.TotalDespesas),
				SaldoLiquido = pessoas.Sum(p => p.Saldo)
			};

			var dados = new
			{
				Pessoas = pessoas,
				TotalGeral = totalGeral
			};

			return new ApiResponse(true, "Relatório por pessoa gerado com sucesso.", dados);
		}
	}
}