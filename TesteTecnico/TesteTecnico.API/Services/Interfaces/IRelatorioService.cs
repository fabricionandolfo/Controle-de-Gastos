using TesteTecnico.API.DTOs;

namespace TesteTecnico.API.Services.Interfaces
{
	public interface IRelatorioService
	{
		Task<ApiResponse> ObterTotaisPorPessoaAsync();
	}
}
