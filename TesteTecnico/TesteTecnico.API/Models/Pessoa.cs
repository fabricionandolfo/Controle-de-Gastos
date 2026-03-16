using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TesteTecnico.API.Models
{
	public class Pessoa
	{
		public int Id { get; set; }
		public string Nome { get; set; } = string.Empty;
		public int Idade { get; set; }

		// Navegação: uma pessoa pode ter várias transações
		//[JsonIgnore]
		public List<Transacao> Transacoes { get; set; } = new();
	}
}
