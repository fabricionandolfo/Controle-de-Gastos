using Microsoft.EntityFrameworkCore;
using TesteTecnico.API.Data;
using TesteTecnico.API.Models;
using TesteTecnico.API.Repositories.Interfaces;

namespace TesteTecnico.API.Repositories
{
	public class PessoaRepositorio : IPessoaRepositorio
	{
		private readonly AppDbContext _context;

		public PessoaRepositorio(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<Pessoa>> ListarAsync()
		{
			return await _context.Pessoas
				.AsNoTracking()
				.OrderBy(p => p.Nome)
				.ToListAsync();
		}

		public async Task<Pessoa?> ObterPorIdAsync(int id)
		{
			return await _context.Pessoas
				.AsNoTracking()
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<Pessoa?> ObterRastreadaPorIdAsync(int id)
		{
			return await _context.Pessoas
				.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<Pessoa> AdicionarAsync(Pessoa pessoa)
		{
			_context.Pessoas.Add(pessoa);
			await _context.SaveChangesAsync();
			return pessoa;
		}

		public async Task<Pessoa> AtualizarAsync(Pessoa pessoa)
		{
			await _context.SaveChangesAsync();
			return pessoa;
		}

		public async Task<bool> RemoverAsync(Pessoa pessoa)
		{
			_context.Pessoas.Remove(pessoa);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}