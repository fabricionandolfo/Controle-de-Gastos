using TesteTecnico.API.Models;

namespace TesteTecnico.API.Repositories.Interfaces
{
	public interface IPessoaRepositorio
	{
		Task<List<Pessoa>> ListarAsync();
		Task<Pessoa?> ObterPorIdAsync(int id);
		Task<Pessoa?> ObterRastreadaPorIdAsync(int id);
		Task<Pessoa> AdicionarAsync(Pessoa pessoa);
		Task<Pessoa> AtualizarAsync(Pessoa pessoa);
		Task<bool> RemoverAsync(Pessoa pessoa);
	}
}
