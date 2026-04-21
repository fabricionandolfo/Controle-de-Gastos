using System.ComponentModel.DataAnnotations;

namespace TesteTecnico.APP.Models
{
	public class CategoriaViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "A descrição é obrigatória.")]
		[MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
		public string Descricao { get; set; } = string.Empty;

		[Required(ErrorMessage = "A finalidade é obrigatória.")]
		public FinalidadeCategoriaViewModel Finalidade { get; set; }
	}
}