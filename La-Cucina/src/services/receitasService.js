const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function buscarReceitas(nome) {
  try {
    const response = await fetch(`${API_URL}/search.php?s=${encodeURIComponent(nome)}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar receitas');
    }

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    throw error;
  }
}

export async function buscarReceitaPorId(id) {
  try {
    const response = await fetch(`${API_URL}/lookup.php?i=${id}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes da receita');
    }

    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Erro ao buscar receita por id:', error);
    throw error;
  }
}
