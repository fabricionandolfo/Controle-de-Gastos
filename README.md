# 💰 Sistema de Controle de Gastos Pessoais

Aplicação completa para gerenciamento de receitas e despesas por pessoa, com dashboard financeiro e relatórios consolidados.

---

## 📌 Funcionalidades

- Cadastro de **Pessoas**
- Cadastro de **Categorias** (Receita, Despesa ou Ambas)
- Cadastro de **Transações**
- Dashboard com:
  - Total de receitas
  - Total de despesas
  - Saldo geral
- Relatório consolidado por pessoa

---

## 🧠 Regras de Negócio

- Pessoas menores de idade não podem receber **receitas**
- Transações devem possuir:
  - Pessoa válida
  - Categoria válida
  - Valor maior que zero

---

## 🏗️ Arquitetura

O backend foi desenvolvido utilizando **arquitetura em camadas**:

- Controllers → entrada da API
- Services → regras de negócio
- Repositories → acesso a dados

Essa separação facilita manutenção, testes e evolução do sistema.

---

## 🗄️ Banco de Dados

- SQLite
- Acesso via Entity Framework Core

---

## 🌱 Seed de Dados

Ao iniciar a aplicação, o sistema cria automaticamente:

- Pessoas
- Categorias
- Transações de exemplo

Isso permite testar o sistema imediatamente sem cadastro manual.

---

## ⚙️ Tecnologias

### 🔹 Backend

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger

### 🔹 Frontend (MVC)

- ASP.NET Core MVC
- Razor Pages
- Bootstrap

---

## ▶️ Como executar

### Backend

```bash
dotnet run
