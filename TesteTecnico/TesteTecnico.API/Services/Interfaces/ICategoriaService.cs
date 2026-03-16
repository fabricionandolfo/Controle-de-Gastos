using TesteTecnico.API.DTOs;

namespace TesteTecnico.API.Services.Interfaces
{
	public interface ICategoriaService
	{
		Task<ApiResponse> ListarAsync();
		Task<ApiResponse> AdicionarAsync(CategoriaDto dto);
	}
}