using TesteTecnico.API.DTOs;
using TesteTecnico.API.Enums;
using TesteTecnico.API.Models;
using TesteTecnico.API.Repositories.Interfaces;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Services
{
	public class CategoriaService : ICategoriaService
	{
		private readonly ICategoriaRepositorio _categoriaRepositorio;

		public CategoriaService(ICategoriaRepositorio categoriaRepositorio)
		{
			_categoriaRepositorio = categoriaRepositorio;
		}

		public async Task<ApiResponse> ListarAsync()
		{
			var categorias = await _categoriaRepositorio.ListarAsync();

			return new ApiResponse(true, "Categorias listadas com sucesso.", categorias);
		}

		public async Task<ApiResponse> AdicionarAsync(CategoriaDto dto)
		{
			if (string.IsNullOrWhiteSpace(dto.Descricao))
				return new ApiResponse(false, "A descrição é obrigatória.");

			var descricao = dto.Descricao.Trim();

			if (descricao.Length > 400)
				return new ApiResponse(false, "A descrição deve ter no máximo 400 caracteres.");

			// Valida se a finalidade informada é uma das opções do enum.
			if (!Enum.IsDefined(typeof(FinalidadeCategoria), dto.Finalidade))
				return new ApiResponse(false, "Finalidade inválida. Use Despesa, Receita ou Ambas.");

			var categoria = new Categoria
			{
				Descricao = descricao,
				Finalidade = dto.Finalidade
			};

			await _categoriaRepositorio.AdicionarAsync(categoria);

			return new ApiResponse(true, "Categoria criada com sucesso.", categoria);
		}
	}
}