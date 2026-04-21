using System.Text;
using System.Text.Json;
using TesteTecnico.APP.Models;

namespace TesteTecnico.APP.Services
{
	public class TransacaoApiService : BaseApiService
	{
		public TransacaoApiService(IHttpClientFactory httpClientFactory) : base(httpClientFactory)
		{
		}

		public async Task<List<TransacaoViewModel>> ListarAsync()
		{
			var client = CreateClient();
			var response = await client.GetAsync("api/transacoes");
			response.EnsureSuccessStatusCode();

			var result = await ReadAsync<List<TransacaoViewModel>>(response);
			return result?.Dados ?? new List<TransacaoViewModel>();
		}

		public async Task<(bool sucesso, string mensagem)> CriarAsync(TransacaoViewModel model)
		{
			var client = CreateClient();
			var payload = new
			{
				model.Descricao,
				model.Valor,
				Tipo = (int)model.Tipo,
				model.CategoriaId,
				model.PessoaId
			};

			var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
			var response = await client.PostAsync("api/transacoes", content);
			var result = await ReadAsync<object>(response);

			return (response.IsSuccessStatusCode && (result?.Sucesso ?? false), result?.Mensagem ?? "Erro ao cadastrar transação.");
		}
	}
}