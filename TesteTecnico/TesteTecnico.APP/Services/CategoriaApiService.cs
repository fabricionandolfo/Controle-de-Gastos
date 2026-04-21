using System.Text;
using System.Text.Json;
using TesteTecnico.APP.Models;

namespace TesteTecnico.APP.Services
{
	public class CategoriaApiService : BaseApiService
	{
		public CategoriaApiService(IHttpClientFactory httpClientFactory) : base(httpClientFactory)
		{
		}

		public async Task<List<CategoriaViewModel>> ListarAsync()
		{
			var client = CreateClient();
			var response = await client.GetAsync("api/categorias");
			response.EnsureSuccessStatusCode();

			var result = await ReadAsync<List<CategoriaViewModel>>(response);
			return result?.Dados ?? new List<CategoriaViewModel>();
		}

		public async Task<(bool sucesso, string mensagem)> CriarAsync(CategoriaViewModel model)
		{
			var client = CreateClient();
			var payload = new { model.Descricao, Finalidade = (int)model.Finalidade };
			var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

			var response = await client.PostAsync("api/categorias", content);
			var result = await ReadAsync<object>(response);

			return (response.IsSuccessStatusCode && (result?.Sucesso ?? false), result?.Mensagem ?? "Erro ao cadastrar categoria.");
		}
	}
}