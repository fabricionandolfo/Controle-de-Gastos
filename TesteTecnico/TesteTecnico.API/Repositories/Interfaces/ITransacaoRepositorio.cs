using TesteTecnico.API.Models;

namespace TesteTecnico.API.Repositories.Interfaces
{
	public interface ITransacaoRepositorio
	{
		Task<List<Transacao>> ListarAsync();
		Task<Transacao> AdicionarAsync(Transacao transacao);
	}
}
