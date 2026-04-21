using TesteTecnico.APP.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddHttpClient("MinhaApi", client =>
{
	client.BaseAddress = new Uri("http://localhost:5064/");
});

builder.Services.AddScoped<PessoaApiService>();
builder.Services.AddScoped<CategoriaApiService>();
builder.Services.AddScoped<TransacaoApiService>();
builder.Services.AddScoped<RelatorioApiService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Dashboard}/{action=Index}/{id?}");

app.Run();