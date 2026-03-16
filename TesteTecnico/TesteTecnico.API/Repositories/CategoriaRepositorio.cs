using Microsoft.EntityFrameworkCore;
using TesteTecnico.API.Data;
using TesteTecnico.API.Models;
using TesteTecnico.API.Repositories.Interfaces;

namespace TesteTecnico.API.Repositories
{
	public class CategoriaRepositorio : ICategoriaRepositorio
	{
		private readonly AppDbContext _context;

		public CategoriaRepositorio(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<Categoria>> ListarAsync()
		{
			return await _context.Categorias
				.AsNoTracking()
				.OrderBy(c => c.Descricao)
				.ToListAsync();
		}

		public async Task<Categoria> AdicionarAsync(Categoria categoria)
		{
			_context.Categorias.Add(categoria);
			await _context.SaveChangesAsync();
			return categoria;
		}

		public async Task<Categoria?> ObterPorIdAsync(int id)
		{
			return await _context.Categorias
				.AsNoTracking()
				.FirstOrDefaultAsync(c => c.Id == id);
		}
	}
}