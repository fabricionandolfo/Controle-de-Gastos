using System.Text.Json;
using TesteTecnico.APP.Models;

namespace TesteTecnico.APP.Services
{
	public abstract class BaseApiService
	{
		protected readonly IHttpClientFactory HttpClientFactory;
		protected readonly JsonSerializerOptions JsonOptions;

		protected BaseApiService(IHttpClientFactory httpClientFactory)
		{
			HttpClientFactory = httpClientFactory;
			JsonOptions = new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true
			};
		}

		protected HttpClient CreateClient() => HttpClientFactory.CreateClient("MinhaApi");

		protected async Task<ApiResponse<T>?> ReadAsync<T>(HttpResponseMessage response)
		{
			var json = await response.Content.ReadAsStringAsync();
			return JsonSerializer.Deserialize<ApiResponse<T>>(json, JsonOptions);
		}
	}
}