using Microsoft.AspNetCore.Mvc;
using TesteTecnico.API.DTOs;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CategoriasController : ControllerBase
	{
		private readonly ICategoriaService _categoriaService;

		public CategoriasController(ICategoriaService categoriaService)
		{
			_categoriaService = categoriaService;
		}

		/// <summary>
		/// Lista todas as categorias cadastradas.
		/// </summary>
		[HttpGet]
		public async Task<ActionResult<ApiResponse>> GetAll()
		{
			var resultado = await _categoriaService.ListarAsync();
			return Ok(resultado);
		}

		/// <summary>
		/// Cria uma nova categoria.
		/// </summary>
		[HttpPost]
		public async Task<ActionResult<ApiResponse>> Create([FromBody] CategoriaDto dto)
		{
			if (!ModelState.IsValid)
				return BadRequest(new ApiResponse(false, "Dados inválidos.", ModelState));

			var resultado = await _categoriaService.AdicionarAsync(dto);

			if (!resultado.Sucesso)
				return BadRequest(resultado);

			return Created(string.Empty, resultado);
		}
	}
}