using Microsoft.AspNetCore.Mvc;
using TesteTecnico.API.DTOs;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PessoasController : ControllerBase
	{
		private readonly IPessoaService _pessoaService;

		public PessoasController(IPessoaService pessoaService)
		{
			_pessoaService = pessoaService;
		}

		[HttpGet]
		public async Task<ActionResult<ApiResponse>> GetAll()
		{
			var resultado = await _pessoaService.ListarAsync();
			return Ok(resultado);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ApiResponse>> GetById(int id)
		{
			var resultado = await _pessoaService.ObterPorIdAsync(id);

			if (!resultado.Sucesso)
				return NotFound(resultado);

			return Ok(resultado);
		}

		[HttpPost]
		public async Task<ActionResult<ApiResponse>> Create([FromBody] PessoaDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(new ApiResponse(false, "Dados inválidos.", ModelState));

			var resultado = await _pessoaService.AdicionarAsync(dto);

			if (!resultado.Sucesso)
				return BadRequest(resultado);

			return Created(string.Empty, resultado);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<ApiResponse>> Update(int id, [FromBody] PessoaDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(new ApiResponse(false, "Dados inválidos.", ModelState));

			var resultado = await _pessoaService.AtualizarAsync(id, dto);

			if (!resultado.Sucesso)
			{
				if (resultado.Mensagem == "Pessoa não encontrada.")
					return NotFound(resultado);

				return BadRequest(resultado);
			}

			return Ok(resultado);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ApiResponse>> Delete(int id)
		{
			var resultado = await _pessoaService.RemoverAsync(id);

			if (!resultado.Sucesso)
				return NotFound(resultado);

			return Ok(resultado);
		}
	}
}