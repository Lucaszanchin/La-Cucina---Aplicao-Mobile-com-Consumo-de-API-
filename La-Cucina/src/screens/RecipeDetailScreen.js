import { useEffect, useState } from 'react';
import { ScrollView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import ReceitaHeader from '../components/ReceitaHeader';
import IngredienteItem from '../components/IngredientesItem';
import VideoButton from '../components/VideoButton';
import { buscarReceitaPorId } from '../services/api';
import { theme } from '../styles/theme';

export default function RecipeDetailScreen({ route }) {
  const { mealId } = route.params || {};
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    if (!mealId) {
      return;
    }

    async function carregar() {
      const dados = await buscarReceitaPorId(mealId);
      setReceita(dados);
    }

    carregar();
  }, [mealId]);

  if (!receita) {
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.loading}
      />
    );
  }

  const ingredientes = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingrediente = receita[`strIngredient${i}`];
    const medida = receita[`strMeasure${i}`];

    if (ingrediente && ingrediente.trim()) {
      ingredientes.push({ ingrediente, medida });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ReceitaHeader receita={receita} />

      <Text style={styles.subtitulo}>Ingredientes</Text>

      {ingredientes.map((item, index) => (
        <IngredienteItem key={`${item.ingrediente}-${index}`} ingrediente={item.ingrediente} medida={item.medida} />
      ))}

      <Text style={styles.subtitulo}>Modo de preparo</Text>
      <Text style={styles.instrucoes}>{receita.strInstructions}</Text>

      {receita.strYoutube && <VideoButton url={receita.strYoutube} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 15,
    paddingBottom: 24,
  },
  loading: {
    marginTop: 30,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  instrucoes: {
    fontSize: 15,
    lineHeight: 24,
    color: theme.colors.textPrimary,
  },
});