using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TesteTecnico.API.Data;
using TesteTecnico.API.Repositories.Interfaces;
using TesteTecnico.API.Repositories;
using TesteTecnico.API.Services;
using TesteTecnico.API.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
	.AddJsonOptions(options =>
	{
		options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
	});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlite("Data Source=controle_gasto.db"));

builder.Services.AddScoped<IPessoaRepositorio, PessoaRepositorio>();
builder.Services.AddScoped<IPessoaService, PessoaService>();

builder.Services.AddScoped<ICategoriaRepositorio, CategoriaRepositorio>();
builder.Services.AddScoped<ICategoriaService, CategoriaService>();

builder.Services.AddScoped<ITransacaoRepositorio, TransacaoRepositorio>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();

builder.Services.AddScoped<IRelatorioRepositorio, RelatorioRepositorio>();
builder.Services.AddScoped<IRelatorioService, RelatorioService>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("PermitirFront", policy =>
	{
		policy
			.AllowAnyOrigin()
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});

var app = builder.Build();

/* Seed */
using (var scope = app.Services.CreateScope())
{
	var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
	context.Database.EnsureCreated();
	TesteTecnico.API.Data.Seed.DbInitializer.Inicializar(context);
}
/* Seed */

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("PermitirFront");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();