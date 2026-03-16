using System.ComponentModel.DataAnnotations;
using TesteTecnico.API.Enums;

namespace TesteTecnico.API.DTOs
{
	public class CategoriaDto
	{
		[Required(ErrorMessage = "A descrição é obrigatória.")]
		[MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
		public string Descricao { get; set; } = string.Empty;

		[Required(ErrorMessage = "A finalidade é obrigatória.")]
		public FinalidadeCategoria Finalidade { get; set; }
	}
}
