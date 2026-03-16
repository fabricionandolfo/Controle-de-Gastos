using Microsoft.EntityFrameworkCore;
using TesteTecnico.API.Data;
using TesteTecnico.API.DTOs;
using TesteTecnico.API.Enums;
using TesteTecnico.API.Repositories.Interfaces;

namespace TesteTecnico.API.Repositories
{
	public class RelatorioRepositorio : IRelatorioRepositorio
	{
		private readonly AppDbContext _context;

		public RelatorioRepositorio(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<TotalPessoaDto>> ObterTotaisPorPessoaAsync()
		{
			return await _context.Pessoas
				.AsNoTracking()
				.Select(p => new TotalPessoaDto
				{
					PessoaId = p.Id,
					NomePessoa = p.Nome,

					TotalReceitas = p.Transacoes
						.Where(t => t.Tipo == TipoTransacao.Receita)
						.Sum(t => (decimal?)t.Valor) ?? 0,

					TotalDespesas = p.Transacoes
						.Where(t => t.Tipo == TipoTransacao.Despesa)
						.Sum(t => (decimal?)t.Valor) ?? 0,

					Saldo =
						(p.Transacoes
							.Where(t => t.Tipo == TipoTransacao.Receita)
							.Sum(t => (decimal?)t.Valor) ?? 0)
						-
						(p.Transacoes
							.Where(t => t.Tipo == TipoTransacao.Despesa)
							.Sum(t => (decimal?)t.Valor) ?? 0)
				})
				.OrderBy(p => p.NomePessoa)
				.ToListAsync();
		}
	}
}