using TesteTecnico.API.DTOs;
using TesteTecnico.API.Models;
using TesteTecnico.API.Repositories.Interfaces;
using TesteTecnico.API.Services.Interfaces;

namespace TesteTecnico.API.Services
{
	public class PessoaService : IPessoaService
	{
		private readonly IPessoaRepositorio _pessoaRepositorio;

		public PessoaService(IPessoaRepositorio pessoaRepositorio)
		{
			_pessoaRepositorio = pessoaRepositorio;
		}

		public async Task<ApiResponse> ListarAsync()
		{
			var pessoas = await _pessoaRepositorio.ListarAsync();
			return new ApiResponse(true, "Pessoas listadas com sucesso.", pessoas);
		}

		public async Task<ApiResponse> ObterPorIdAsync(int id)
		{
			var pessoa = await _pessoaRepositorio.ObterPorIdAsync(id);

			if (pessoa == null)
				return new ApiResponse(false, "Pessoa não encontrada.");

			return new ApiResponse(true, "Pessoa encontrada com sucesso.", pessoa);
		}

		public async Task<ApiResponse> AdicionarAsync(PessoaDto dto)
		{
			if (string.IsNullOrWhiteSpace(dto.Nome))
				return new ApiResponse(false, "O nome é obrigatório.");

			var nome = dto.Nome.Trim();

			if (nome.Length > 200)
				return new ApiResponse(false, "O nome deve ter no máximo 200 caracteres.");

			if (dto.Idade < 0)
				return new ApiResponse(false, "Idade inválida.");

			var pessoa = new Pessoa
			{
				Nome = nome,
				Idade = dto.Idade
			};

			await _pessoaRepositorio.AdicionarAsync(pessoa);

			return new ApiResponse(true, "Pessoa criada com sucesso.", pessoa);
		}

		public async Task<ApiResponse> AtualizarAsync(int id, PessoaDto dto)
		{
			if (string.IsNullOrWhiteSpace(dto.Nome))
				return new ApiResponse(false, "O nome é obrigatório.");

			var nome = dto.Nome.Trim();

			if (nome.Length > 200)
				return new ApiResponse(false, "O nome deve ter no máximo 200 caracteres.");

			if (dto.Idade < 0)
				return new ApiResponse(false, "Idade inválida.");

			var pessoa = await _pessoaRepositorio.ObterRastreadaPorIdAsync(id);

			if (pessoa == null)
				return new ApiResponse(false, "Pessoa não encontrada.");

			pessoa.Nome = nome;
			pessoa.Idade = dto.Idade;

			await _pessoaRepositorio.AtualizarAsync(pessoa);

			return new ApiResponse(true, "Pessoa atualizada com sucesso.", pessoa);
		}

		public async Task<ApiResponse> RemoverAsync(int id)
		{
			var pessoa = await _pessoaRepositorio.ObterRastreadaPorIdAsync(id);

			if (pessoa == null)
				return new ApiResponse(false, "Pessoa não encontrada.");

			await _pessoaRepositorio.RemoverAsync(pessoa);

			return new ApiResponse(true, "Pessoa removida com sucesso.");
		}
	}
}