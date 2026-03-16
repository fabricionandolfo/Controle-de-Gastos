namespace TesteTecnico.API.DTOs
{
	public class TotalCategoriaDto
	{
		public int CategoriaId { get; set; }
		public string DescricaoCategoria { get; set; } = string.Empty;
		public decimal TotalReceitas { get; set; }
		public decimal TotalDespesas { get; set; }
		public decimal Saldo { get; set; }
	}
}
