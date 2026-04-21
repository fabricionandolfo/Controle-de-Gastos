namespace TesteTecnico.APP.Models
{
	public class ApiResponse<T>
	{
		public bool Sucesso { get; set; }
		public string Mensagem { get; set; } = string.Empty;
		public T? Dados { get; set; }
	}
}