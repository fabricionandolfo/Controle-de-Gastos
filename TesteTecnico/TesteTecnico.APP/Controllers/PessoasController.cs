using Microsoft.AspNetCore.Mvc;
using TesteTecnico.APP.Models;
using TesteTecnico.APP.Services;

namespace TesteTecnico.APP.Controllers
{
	public class PessoasController : Controller
	{
		private readonly PessoaApiService _service;

		public PessoasController(PessoaApiService service)
		{
			_service = service;
		}

		public async Task<IActionResult> Index()
		{
			var pessoas = await _service.ListarAsync();
			return View(pessoas);
		}

		public IActionResult Create()
		{
			return View(new PessoaViewModel());
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create(PessoaViewModel model)
		{
			if (!ModelState.IsValid) return View(model);

			var result = await _service.CriarAsync(model);
			if (!result.sucesso)
			{
				ModelState.AddModelError(string.Empty, result.mensagem);
				return View(model);
			}

			TempData["Sucesso"] = result.mensagem;
			return RedirectToAction(nameof(Index));
		}

		public async Task<IActionResult> Edit(int id)
		{
			var pessoa = await _service.ObterPorIdAsync(id);
			if (pessoa == null) return NotFound();

			return View(pessoa);
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Edit(int id, PessoaViewModel model)
		{
			if (!ModelState.IsValid) return View(model);

			var result = await _service.EditarAsync(id, model);
			if (!result.sucesso)
			{
				ModelState.AddModelError(string.Empty, result.mensagem);
				return View(model);
			}

			TempData["Sucesso"] = result.mensagem;
			return RedirectToAction(nameof(Index));
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Delete(int id)
		{
			var result = await _service.ExcluirAsync(id);
			TempData[result.sucesso ? "Sucesso" : "Erro"] = result.mensagem;

			return RedirectToAction(nameof(Index));
		}
	}
}