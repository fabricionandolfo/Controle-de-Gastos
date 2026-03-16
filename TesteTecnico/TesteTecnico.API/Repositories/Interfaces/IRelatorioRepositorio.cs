using TesteTecnico.API.DTOs;

namespace TesteTecnico.API.Repositories.Interfaces
{
	public interface IRelatorioRepositorio
	{
		Task<List<TotalPessoaDto>> ObterTotaisPorPessoaAsync();
	}
}
