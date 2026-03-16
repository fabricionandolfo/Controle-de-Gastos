using Microsoft.EntityFrameworkCore;
using TesteTecnico.API.Data;
using TesteTecnico.API.Models;
using TesteTecnico.API.Repositories.Interfaces;

namespace TesteTecnico.API.Repositories
{
	public class TransacaoRepositorio : ITransacaoRepositorio
	{
		private readonly AppDbContext _context;

		public TransacaoRepositorio(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<Transacao>> ListarAsync()
		{
			return await _context.Transacoes
				.AsNoTracking()
				.Include(t => t.Pessoa)
				.Include(t => t.Categoria)
				.OrderByDescending(t => t.Id)
				.ToListAsync();
		}

		public async Task<Transacao> AdicionarAsync(Transacao transacao)
		{
			_context.Transacoes.Add(transacao);
			await _context.SaveChangesAsync();
			return transacao;
		}
	}
}