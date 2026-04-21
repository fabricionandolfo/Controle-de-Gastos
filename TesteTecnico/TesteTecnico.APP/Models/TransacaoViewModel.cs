using System.ComponentModel.DataAnnotations;

namespace TesteTecnico.APP.Models
{
	public class TransacaoViewModel
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "A descrição é obrigatória.")]
		[MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
		public string Descricao { get; set; } = string.Empty;

		[Range(typeof(decimal), "0,01", "999999999", ErrorMessage = "O valor deve ser maior que zero.")]
		public decimal Valor { get; set; }

		[Required(ErrorMessage = "O tipo é obrigatório.")]
		public TipoTransacaoViewModel Tipo { get; set; }

		[Required(ErrorMessage = "A categoria é obrigatória.")]
		public int CategoriaId { get; set; }

		[Required(ErrorMessage = "A pessoa é obrigatória.")]
		public int PessoaId { get; set; }

		public PessoaViewModel? Pessoa { get; set; }
		public CategoriaViewModel? Categoria { get; set; }
	}
}