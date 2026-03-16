using Microsoft.AspNetCore.Mvc;
using TesteTecnico.API.DTOs;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TransacoesController : ControllerBase
	{
		private readonly ITransacaoService _transacaoService;

		public TransacoesController(ITransacaoService transacaoService)
		{
			_transacaoService = transacaoService;
		}

		/// <summary>
		/// Lista todas as transações.
		/// </summary>
		[HttpGet]
		public async Task<ActionResult<ApiResponse>> GetAll()
		{
			var resultado = await _transacaoService.ListarAsync();
			return Ok(resultado);
		}

		/// <summary>
		/// Cria uma nova transação.
		/// </summary>
		[HttpPost]
		public async Task<ActionResult<ApiResponse>> Create([FromBody] TransacaoDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(new ApiResponse(false, "Dados inválidos.", ModelState));

			var resultado = await _transacaoService.AdicionarAsync(dto);

			if (!resultado.Sucesso)
				return BadRequest(resultado);

			return Created(string.Empty, resultado);
		}
	}
}