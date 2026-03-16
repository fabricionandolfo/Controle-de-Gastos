using Microsoft.AspNetCore.Mvc;
using TesteTecnico.API.DTOs;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class RelatoriosController : ControllerBase
	{
		private readonly IRelatorioService _relatorioService;

		public RelatoriosController(IRelatorioService relatorioService)
		{
			_relatorioService = relatorioService;
		}

		/// <summary>
		/// Retorna os totais de receitas, despesas e saldo por pessoa,
		/// além do total geral consolidado.
		/// </summary>
		[HttpGet("pessoas")]
		public async Task<ActionResult<ApiResponse>> GetTotaisPorPessoa()
		{
			var resultado = await _relatorioService.ObterTotaisPorPessoaAsync();
			return Ok(resultado);
		}
	}
}