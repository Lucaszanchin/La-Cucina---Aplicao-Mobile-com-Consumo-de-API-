import { api } from "./api";

export async function buscarReceitas(nome) {
  const response = await api.get(`/search.php?s=${nome}`);

  return response.data.meals || [];
}