using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using TesteTecnico.APP.Models;
using TesteTecnico.APP.Services;

namespace TesteTecnico.APP.Controllers
{
	public class TransacoesController : Controller
	{
		private readonly TransacaoApiService _transacaoService;
		private readonly PessoaApiService _pessoaService;
		private readonly CategoriaApiService _categoriaService;

		public TransacoesController(
			TransacaoApiService transacaoService,
			PessoaApiService pessoaService,
			CategoriaApiService categoriaService)
		{
			_transacaoService = transacaoService;
			_pessoaService = pessoaService;
			_categoriaService = categoriaService;
		}

		public async Task<IActionResult> Index()
		{
			var transacoes = await _transacaoService.ListarAsync();
			return View(transacoes);
		}

		public async Task<IActionResult> Create()
		{
			await CarregarCombosAsync();
			return View(new TransacaoViewModel());
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create(TransacaoViewModel model)
		{
			if (!ModelState.IsValid)
			{
				await CarregarCombosAsync();
				return View(model);
			}

			var result = await _transacaoService.CriarAsync(model);
			if (!result.sucesso)
			{
				ModelState.AddModelError(string.Empty, result.mensagem);
				await CarregarCombosAsync();
				return View(model);
			}

			TempData["Sucesso"] = result.mensagem;
			return RedirectToAction(nameof(Index));
		}

		private async Task CarregarCombosAsync()
		{
			var pessoas = await _pessoaService.ListarAsync();
			var categorias = await _categoriaService.ListarAsync();

			ViewBag.Pessoas = pessoas
				.Select(x => new SelectListItem
				{
					Value = x.Id.ToString(),
					Text = $"{x.Nome} ({x.Idade} anos)"
				})
				.ToList();

			ViewBag.Categorias = categorias
				.Select(x => new SelectListItem
				{
					Value = x.Id.ToString(),
					Text = $"{x.Descricao} - {x.Finalidade}"
				})
				.ToList();

			ViewBag.Tipos = Enum.GetValues(typeof(TipoTransacaoViewModel))
				.Cast<TipoTransacaoViewModel>()
				.Select(x => new SelectListItem
				{
					Value = ((int)x).ToString(),
					Text = x.ToString()
				})
				.ToList();
		}
	}
}