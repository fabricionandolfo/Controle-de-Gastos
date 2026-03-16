import { api } from "../api/api";

export const obterRelatorioPessoas = async () => {
  const response = await api.get("/relatorios/pessoas");
  return response.data.dados;
};