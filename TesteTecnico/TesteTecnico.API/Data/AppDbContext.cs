using TesteTecnico.API.Models;
using Microsoft.EntityFrameworkCore;

namespace TesteTecnico.API.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public DbSet<Pessoa> Pessoas => Set<Pessoa>();
		public DbSet<Categoria> Categorias => Set<Categoria>();
		public DbSet<Transacao> Transacoes => Set<Transacao>();

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Pessoa>()
				.Property(p => p.Nome)
				.HasMaxLength(200)
				.IsRequired();

			modelBuilder.Entity<Categoria>()
				.Property(c => c.Descricao)
				.HasMaxLength(400)
				.IsRequired();

			modelBuilder.Entity<Transacao>()
				.Property(t => t.Descricao)
				.HasMaxLength(400)
				.IsRequired();

			modelBuilder.Entity<Transacao>()
				.Property(t => t.Valor)
				.HasPrecision(18, 2);

			// Exclusão em cascata:
			// ao excluir uma pessoa, apaga as transações vinculadas a ela.
			modelBuilder.Entity<Transacao>()
				.HasOne(t => t.Pessoa)
				.WithMany(p => p.Transacoes)
				.HasForeignKey(t => t.PessoaId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Transacao>()
				.HasOne(t => t.Categoria)
				.WithMany()
				.HasForeignKey(t => t.CategoriaId)
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
