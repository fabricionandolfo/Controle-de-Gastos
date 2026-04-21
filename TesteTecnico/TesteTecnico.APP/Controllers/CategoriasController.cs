using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using TesteTecnico.APP.Models;
using TesteTecnico.APP.Services;

namespace TesteTecnico.APP.Controllers
{
	public class CategoriasController : Controller
	{
		private readonly CategoriaApiService _service;

		public CategoriasController(CategoriaApiService service)
		{
			_service = service;
		}

		public async Task<IActionResult> Index()
		{
			var categorias = await _service.ListarAsync();
			return View(categorias);
		}

		public IActionResult Create()
		{
			CarregarFinalidades();
			return View(new CategoriaViewModel());
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create(CategoriaViewModel model)
		{
			if (!ModelState.IsValid)
			{
				CarregarFinalidades();
				return View(model);
			}

			var result = await _service.CriarAsync(model);
			if (!result.sucesso)
			{
				ModelState.AddModelError(string.Empty, result.mensagem);
				CarregarFinalidades();
				return View(model);
			}

			TempData["Sucesso"] = result.mensagem;
			return RedirectToAction(nameof(Index));
		}

		private void CarregarFinalidades()
		{
			ViewBag.Finalidades = Enum.GetValues(typeof(FinalidadeCategoriaViewModel))
				.Cast<FinalidadeCategoriaViewModel>()
				.Select(x => new SelectListItem
				{
					Value = ((int)x).ToString(),
					Text = x.ToString()
				})
				.ToList();
		}
	}
}