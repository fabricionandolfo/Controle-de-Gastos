import { api } from "../api/api";

export type Transacao = {
  id: number;
  descricao: string;
  valor: number;
  tipo: number;
  categoriaId: number;
  pessoaId: number;
  categoria?: {
    id: number;
    descricao: string;
    finalidade: number;
  };
  pessoa?: {
    id: number;
    nome: string;
    idade: number;
  };
};

export type TransacaoFormData = {
  descricao: string;
  valor: number;
  tipo: number;
  categoriaId: number;
  pessoaId: number;
};

export const listarTransacoes = async (): Promise<Transacao[]> => {
  const response = await api.get("/transacoes");
  return response.data.dados;
};

export const criarTransacao = async (dados: TransacaoFormData) => {
  const response = await api.post("/transacoes", dados);
  return response.data;
};