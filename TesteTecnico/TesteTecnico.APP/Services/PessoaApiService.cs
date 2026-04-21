using System.Text;
using System.Text.Json;
using TesteTecnico.APP.Models;

namespace TesteTecnico.APP.Services
{
	public class PessoaApiService : BaseApiService
	{
		public PessoaApiService(IHttpClientFactory httpClientFactory) : base(httpClientFactory)
		{
		}

		public async Task<List<PessoaViewModel>> ListarAsync()
		{
			var client = CreateClient();
			var response = await client.GetAsync("api/pessoas");
			response.EnsureSuccessStatusCode();

			var result = await ReadAsync<List<PessoaViewModel>>(response);
			return result?.Dados ?? new List<PessoaViewModel>();
		}

		public async Task<PessoaViewModel?> ObterPorIdAsync(int id)
		{
			var client = CreateClient();
			var response = await client.GetAsync($"api/pessoas/{id}");
			if (!response.IsSuccessStatusCode) return null;

			var result = await ReadAsync<PessoaViewModel>(response);
			return result?.Dados;
		}

		public async Task<(bool sucesso, string mensagem)> CriarAsync(PessoaViewModel model)
		{
			var client = CreateClient();
			var payload = new { model.Nome, model.Idade };
			var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

			var response = await client.PostAsync("api/pessoas", content);
			var result = await ReadAsync<object>(response);

			return (response.IsSuccessStatusCode && (result?.Sucesso ?? false), result?.Mensagem ?? "Erro ao cadastrar pessoa.");
		}

		public async Task<(bool sucesso, string mensagem)> EditarAsync(int id, PessoaViewModel model)
		{
			var client = CreateClient();
			var payload = new { model.Nome, model.Idade };
			var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

			var response = await client.PutAsync($"api/pessoas/{id}", content);
			var result = await ReadAsync<object>(response);

			return (response.IsSuccessStatusCode && (result?.Sucesso ?? false), result?.Mensagem ?? "Erro ao editar pessoa.");
		}

		public async Task<(bool sucesso, string mensagem)> ExcluirAsync(int id)
		{
			var client = CreateClient();
			var response = await client.DeleteAsync($"api/pessoas/{id}");
			var result = await ReadAsync<object>(response);

			return (response.IsSuccessStatusCode && (result?.Sucesso ?? false), result?.Mensagem ?? "Erro ao excluir pessoa.");
		}
	}
}