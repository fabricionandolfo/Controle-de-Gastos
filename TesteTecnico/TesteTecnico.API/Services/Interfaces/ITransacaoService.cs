using TesteTecnico.API.DTOs;

namespace TesteTecnico.API.Services.Interfaces
{
	public interface ITransacaoService
	{
		Task<ApiResponse> ListarAsync();
		Task<ApiResponse> AdicionarAsync(TransacaoDto dto);
	}
}
