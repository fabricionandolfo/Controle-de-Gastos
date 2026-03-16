using TesteTecnico.API.Models;

namespace TesteTecnico.API.Repositories.Interfaces
{
	public interface ICategoriaRepositorio
	{
		Task<List<Categoria>> ListarAsync();
		Task<Categoria?> ObterPorIdAsync(int id);
		Task<Categoria> AdicionarAsync(Categoria categoria);
	}
}
