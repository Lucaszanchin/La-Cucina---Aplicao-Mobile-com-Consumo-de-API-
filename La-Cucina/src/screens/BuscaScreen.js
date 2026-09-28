import { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import SearchBar from '../components/SearchBar';
import ReceitaCard from '../components/ReceitaCard';
import EmptyState from '../components/EmptyState';
import { buscarReceitas } from '../services/receitasService';
import { theme } from '../styles/theme';

export default function BuscaScreen() {
  const [texto, setTexto] = useState('');
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pesquisou, setPesquisou] = useState(false);

  async function pesquisar() {
    if (!texto.trim()) {
      return;
    }

    try {
      setLoading(true);
      const dados = await buscarReceitas(texto);
      setReceitas(dados);
      setPesquisou(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar valor={texto} alterarTexto={setTexto} pesquisar={pesquisar} />

      {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />}

      {!loading && pesquisou && receitas.length === 0 && <EmptyState />}

      <FlatList
        data={receitas}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ReceitaCard receita={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
  },
  loading: {
    marginTop: 20,
  },
  list: {
    paddingBottom: 24,
  },
});