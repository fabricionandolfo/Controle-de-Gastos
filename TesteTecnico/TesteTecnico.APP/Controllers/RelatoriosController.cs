using Microsoft.AspNetCore.Mvc;
using TesteTecnico.APP.Services;

namespace TesteTecnico.APP.Controllers
{
	public class RelatoriosController : Controller
	{
		private readonly RelatorioApiService _service;

		public RelatoriosController(RelatorioApiService service)
		{
			_service = service;
		}

		public async Task<IActionResult> Index()
		{
			var relatorio = await _service.ObterRelatorioPorPessoaAsync();
			return View(relatorio);
		}
	}
}