const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function buscarReceitaAleatoria() {
    try {
        const response = await fetch(`${API_URL}/random.php`);

        if (!response.ok) {
            throw new Error('Erro ao buscar receita aleatória');
        }

        const data = await response.json();

        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function buscarCategorias() {
    try {
        const response = await fetch(`${API_URL}/categories.php`);

        if (!response.ok) {
            throw new Error('Erro ao buscar categorias');
        }

        const data = await response.json();

        return data.categories || [];
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function buscarReceitasPorCategoria(categoria) {
    try {
        const response = await fetch(
            `${API_URL}/filter.php?c=${encodeURIComponent(categoria)}`
        );

        if (!response.ok) {
            throw new Error('Erro ao buscar receitas');
        }

        const data = await response.json();

        return data.meals || [];
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function buscarReceitaPorId(id) {
    try {
        const response = await fetch(
            `${API_URL}/lookup.php?i=${id}`
        );

        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes da receita');
        }

        const data = await response.json();

        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}