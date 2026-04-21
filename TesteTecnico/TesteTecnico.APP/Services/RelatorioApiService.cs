using TesteTecnico.APP.Models;

namespace TesteTecnico.APP.Services
{
	public class RelatorioApiService : BaseApiService
	{
		public RelatorioApiService(IHttpClientFactory httpClientFactory) : base(httpClientFactory)
		{
		}

		public async Task<RelatorioPessoasResponseViewModel> ObterRelatorioPorPessoaAsync()
		{
			var client = CreateClient();
			var response = await client.GetAsync("api/relatorios/pessoas");
			response.EnsureSuccessStatusCode();

			var result = await ReadAsync<RelatorioPessoasResponseViewModel>(response);
			return result?.Dados ?? new RelatorioPessoasResponseViewModel();
		}
	}
}