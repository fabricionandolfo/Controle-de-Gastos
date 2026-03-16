Controle de Gastos

Projeto desenvolvido para controle de receitas e despesas por pessoa.

A aplicação permite cadastrar pessoas, categorias e transações, além de visualizar um relatório consolidado com total de receitas, despesas e saldo por pessoa.

O backend foi desenvolvido com ASP.NET Core Web API utilizando arquitetura em camadas (Controllers, Services e Repositories) para separar responsabilidades e manter o código organizado.

O banco utilizado é SQLite, acessado através do Entity Framework Core.

Seed de Dados

O projeto possui uma seed automática que cria alguns dados iniciais para facilitar os testes.

Ao iniciar a aplicação o sistema cria automaticamente:

Pessoas

Categorias

Algumas transações de exemplo

Isso permite já abrir o sistema e visualizar o relatório funcionando sem precisar cadastrar tudo manualmente.

Tecnologias

Backend

 -.NET 8

 -ASP.NET Core Web API

 -Entity Framework Core

 -SQLite

 -Swagger

Frontend

 -React

 -TypeScript

 -Vite

 -Axios

 -React Router

Como executar
Backend
dotnet run
Frontend
npm install
npm run dev
 Observação

O projeto foi desenvolvido seguindo boas práticas de organização em camadas, separando lógica de negócio, acesso a dados e controllers.

Se quiser, eu também posso te mandar uma versão ainda melhor para recrutador, que fala das regras de negócio (menor não pode receita) em 2 linhas só, que deixa o README bem mais profissional sem ficar grande.