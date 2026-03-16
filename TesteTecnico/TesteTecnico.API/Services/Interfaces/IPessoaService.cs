using TesteTecnico.API.DTOs;
using TesteTecnico.API.Models;

namespace TesteTecnico.API.Services.Interfaces
{
	public interface IPessoaService
	{
		Task<ApiResponse> ListarAsync();
		Task<ApiResponse> ObterPorIdAsync(int id);
		Task<ApiResponse> AdicionarAsync(PessoaDto dto);
		Task<ApiResponse> AtualizarAsync(int id, PessoaDto dto);
		Task<ApiResponse> RemoverAsync(int id);
	}
}
