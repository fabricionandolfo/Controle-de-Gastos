using TesteTecnico.API.DTOs;
using TesteTecnico.API.Enums;
using TesteTecnico.API.Models;
using TesteTecnico.API.Repositories.Interfaces;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Services
{
	public class TransacaoService : ITransacaoService
	{
		private readonly ITransacaoRepositorio _transacaoRepositorio;
		private readonly IPessoaRepositorio _pessoaRepositorio;
		private readonly ICategoriaRepositorio _categoriaRepositorio;

		public TransacaoService(
			ITransacaoRepositorio transacaoRepositorio,
			IPessoaRepositorio pessoaRepositorio,
			ICategoriaRepositorio categoriaRepositorio)
		{
			_transacaoRepositorio = transacaoRepositorio;
			_pessoaRepositorio = pessoaRepositorio;
			_categoriaRepositorio = categoriaRepositorio;
		}

		public async Task<ApiResponse> ListarAsync()
		{
			var transacoes = await _transacaoRepositorio.ListarAsync();

			return new ApiResponse(true, "Transações listadas com sucesso.", transacoes);
		}

		public async Task<ApiResponse> AdicionarAsync(TransacaoDto dto)
		{
			if (string.IsNullOrWhiteSpace(dto.Descricao))
				return new ApiResponse(false, "A descrição é obrigatória.");

			var descricao = dto.Descricao.Trim();

			if (descricao.Length > 400)
				return new ApiResponse(false, "A descrição deve ter no máximo 400 caracteres.");

			if (dto.Valor <= 0)
				return new ApiResponse(false, "O valor deve ser maior que zero.");

			var pessoa = await _pessoaRepositorio.ObterPorIdAsync(dto.PessoaId);

			if (pessoa == null)
				return new ApiResponse(false, "Pessoa não encontrada.");

			var categoria = await _categoriaRepositorio.ObterPorIdAsync(dto.CategoriaId);

			if (categoria == null)
				return new ApiResponse(false, "Categoria não encontrada.");

			// Regra: menor de idade não pode receber receita
			if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
				return new ApiResponse(false, "Menores de idade só podem possuir despesas.");

			// Regra de compatibilidade categoria x tipo
			if (dto.Tipo == TipoTransacao.Despesa &&
				categoria.Finalidade == FinalidadeCategoria.Receita)
				return new ApiResponse(false, "Categoria incompatível com despesa.");

			if (dto.Tipo == TipoTransacao.Receita &&
				categoria.Finalidade == FinalidadeCategoria.Despesa)
				return new ApiResponse(false, "Categoria incompatível com receita.");

			var transacao = new Transacao
			{
				Descricao = descricao,
				Valor = dto.Valor,
				Tipo = dto.Tipo,
				PessoaId = dto.PessoaId,
				CategoriaId = dto.CategoriaId
			};

			await _transacaoRepositorio.AdicionarAsync(transacao);

			return new ApiResponse(true, "Transação criada com sucesso.", transacao);
		}
	}
}