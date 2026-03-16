import { api } from "../api/api";

export type Categoria = {
  id: number;
  descricao: string;
  finalidade: number;
};

export type CategoriaFormData = {
  descricao: string;
  finalidade: number;
};

export const listarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get("/categorias");
  return response.data.dados;
};

export const criarCategoria = async (dados: CategoriaFormData) => {
  const response = await api.post("/categorias", dados);
  return response.data;
};