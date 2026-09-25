const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Erro ao procurar categorias:', error);
    return [];
  }
};

export const getMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Erro ao procurar receitas:', error);
    return [];
  }
};

export const getMealDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Erro ao procurar detalhes da receita:', error);
    return null;
  }
};

export const searchMeals = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Erro ao pesquisar receitas:', error);
    return [];
  }
};