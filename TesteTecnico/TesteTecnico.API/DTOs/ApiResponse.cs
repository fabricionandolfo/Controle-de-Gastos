namespace TesteTecnico.API.DTOs
{
	public class ApiResponse
	{
		public bool Sucesso { get; set; }
		public string Mensagem { get; set; }
		public object? Dados { get; set; }

		public ApiResponse(bool sucesso, string mensagem, object? dados = null)
		{
			Sucesso = sucesso;
			Mensagem = mensagem;
			Dados = dados;
		}
	}
}
