using Microsoft.AspNetCore.Mvc;
using TesteTecnico.APP.Models;
using TesteTecnico.APP.Services;

namespace TesteTecnico.APP.Controllers
{
	public class DashboardController : Controller
	{
		private readonly PessoaApiService _pessoaService;
		private readonly CategoriaApiService _categoriaService;
		private readonly TransacaoApiService _transacaoService;
		private readonly RelatorioApiService _relatorioService;

		public DashboardController(
			PessoaApiService pessoaService,
			CategoriaApiService categoriaService,
			TransacaoApiService transacaoService,
			RelatorioApiService relatorioService)
		{
			_pessoaService = pessoaService;
			_categoriaService = categoriaService;
			_transacaoService = transacaoService;
			_relatorioService = relatorioService;
		}

		public async Task<IActionResult> Index()
		{
			var pessoas = await _pessoaService.ListarAsync();
			var categorias = await _categoriaService.ListarAsync();
			var transacoes = await _transacaoService.ListarAsync();
			var relatorio = await _relatorioService.ObterRelatorioPorPessoaAsync();

			var vm = new DashboardViewModel
			{
				TotalPessoas = pessoas.Count,
				TotalCategorias = categorias.Count,
				TotalTransacoes = transacoes.Count,
				TotalReceitas = relatorio.TotalGeral.TotalReceitas,
				TotalDespesas = relatorio.TotalGeral.TotalDespesas,
				SaldoLiquido = relatorio.TotalGeral.SaldoLiquido,
				PessoasResumo = relatorio.Pessoas,
				UltimasTransacoes = transacoes.Take(5).ToList()
			};

			return View(vm);
		}
	}
}