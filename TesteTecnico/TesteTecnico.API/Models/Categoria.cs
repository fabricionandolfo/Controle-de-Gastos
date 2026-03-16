using System.ComponentModel.DataAnnotations;
using TesteTecnico.API.Enums;

namespace TesteTecnico.API.Models
{
	public class Categoria
	{
		public int Id { get; set; }
		public string Descricao { get; set; } = string.Empty;
		public FinalidadeCategoria Finalidade { get; set; }

		public List<Transacao> Transacoes { get; set; } = new();
	}
}
