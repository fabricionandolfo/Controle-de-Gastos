import { api } from "../api/api";

export type Pessoa = {
  id: number;
  nome: string;
  idade: number;
};

export type PessoaFormData = {
  nome: string;
  idade: number;
};

export const listarPessoas = async (): Promise<Pessoa[]> => {
  const response = await api.get("/pessoas");
  return response.data.dados;
};

export const criarPessoa = async (dados: PessoaFormData) => {
  const response = await api.post("/pessoas", dados);
  return response.data;
};

export const atualizarPessoa = async (id: number, dados: PessoaFormData) => {
  const response = await api.put(`/pessoas/${id}`, dados);
  return response.data;
};

export const excluirPessoa = async (id: number) => {
  const response = await api.delete(`/pessoas/${id}`);
  return response.data;
};