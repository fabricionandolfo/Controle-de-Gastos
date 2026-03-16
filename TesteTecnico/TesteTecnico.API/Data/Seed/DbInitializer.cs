using TesteTecnico.API.Enums;
using TesteTecnico.API.Models;

namespace TesteTecnico.API.Data.Seed
{
	public static class DbInitializer
	{
		public static void Inicializar(AppDbContext context)
		{
			if (context.Pessoas.Any() || context.Categorias.Any() || context.Transacoes.Any())
				return;

			var pessoas = new List<Pessoa>
			{
				new Pessoa { Nome = "Fabricio Ramos", Idade = 30 },
				new Pessoa { Nome = "Maria Silva", Idade = 25 },
				new Pessoa { Nome = "João Souza", Idade = 16 }
			};

			context.Pessoas.AddRange(pessoas);
			context.SaveChanges();

			var categorias = new List<Categoria>
			{
				new Categoria { Descricao = "Salário", Finalidade = FinalidadeCategoria.Receita },
				new Categoria { Descricao = "Supermercado", Finalidade = FinalidadeCategoria.Despesa },
				new Categoria { Descricao = "Conta Compartilhada", Finalidade = FinalidadeCategoria.Ambas },
				new Categoria { Descricao = "Transporte", Finalidade = FinalidadeCategoria.Despesa }
			};

			context.Categorias.AddRange(categorias);
			context.SaveChanges();

			var transacoes = new List<Transacao>
			{
				new Transacao
				{
					Descricao = "Pagamento mensal",
					Valor = 5000,
					Tipo = TipoTransacao.Receita,
					PessoaId = pessoas[0].Id,
					CategoriaId = categorias[0].Id
				},
				new Transacao
				{
					Descricao = "Compra do mês",
					Valor = 850.50m,
					Tipo = TipoTransacao.Despesa,
					PessoaId = pessoas[0].Id,
					CategoriaId = categorias[1].Id
				},
				new Transacao
				{
					Descricao = "Divisão de conta",
					Valor = 120,
					Tipo = TipoTransacao.Despesa,
					PessoaId = pessoas[1].Id,
					CategoriaId = categorias[2].Id
				},
				new Transacao
				{
					Descricao = "Reembolso",
					Valor = 200,
					Tipo = TipoTransacao.Receita,
					PessoaId = pessoas[1].Id,
					CategoriaId = categorias[2].Id
				},
				new Transacao
				{
					Descricao = "Lanche",
					Valor = 35,
					Tipo = TipoTransacao.Despesa,
					PessoaId = pessoas[2].Id,
					CategoriaId = categorias[1].Id
				}
			};

			context.Transacoes.AddRange(transacoes);
			context.SaveChanges();
		}
	}
}