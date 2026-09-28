import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@la_cucina_favoritos';

export async function obteveFavoritos() {
  try {
    const valor = await AsyncStorage.getItem(STORAGE_KEY);
    return valor ? JSON.parse(valor) : [];
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
    return [];
  }
}

export async function salvarFavoritos(favoritos) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
}

export async function adicionarFavorito(receita) {
  const favoritos = await obteveFavoritos();
  const existe = favoritos.some((item) => String(item.idMeal) === String(receita.idMeal));

  if (!existe) {
    const proximo = [...favoritos, receita];
    await salvarFavoritos(proximo);
  }
}

export async function removerFavorito(idMeal) {
  const favoritos = await obteveFavoritos();
  const filtrados = favoritos.filter((item) => String(item.idMeal) !== String(idMeal));
  await salvarFavoritos(filtrados);
  return filtrados;
}
