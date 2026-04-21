using System.ComponentModel.DataAnnotations;

namespace TesteTecnico.APP.Models
{
	public class PessoaViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "O nome é obrigatório.")]
		[MaxLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
		public string Nome { get; set; } = string.Empty;

		[Range(0, 150, ErrorMessage = "Idade inválida.")]
		public int Idade { get; set; }
	}
}