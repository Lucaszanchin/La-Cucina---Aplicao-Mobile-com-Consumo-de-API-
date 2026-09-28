import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert} from 'react-native';
import { buscarCategorias, buscarReceitasPorCategoria } from '../services/api';
import MealCard from '../components/MealCard';
import { theme } from '../styles/theme';

export default function RecipesScreen({ route, navigation }) {
  const categoriaInicial = route.params?.category || 'Beef';

  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(categoriaInicial);
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarCategoriasEReceitas();
  }, []);

  async function carregarCategoriasEReceitas() {
    try {
      setCarregando(true);
      const listaCategorias = await buscarCategorias();
      setCategorias(listaCategorias);
      const catAtual = route.params?.category || (listaCategorias.length > 0 ? listaCategorias[0].strCategory : 'Beef');
      setCategoriaSelecionada(catAtual);

      const listaReceitas = await buscarReceitasPorCategoria(catAtual);
      setReceitas(listaReceitas);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as receitas.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleSelecionarCategoria(nomeCategoria) {
    if (nomeCategoria === categoriaSelecionada) return;

    try {
      setCarregando(true);
      setCategoriaSelecionada(nomeCategoria);
      const resultado = await buscarReceitasPorCategoria(nomeCategoria);
      setReceitas(resultado);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as receitas desta categoria.');
    } finally {
      setCarregando(false);
    }
  }

  function abrirDetalhes(id) {
    navigation.navigate('RecipeDetail', { mealId: id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorar Receitas</Text>
        <Text style={styles.subtitle}>
          Filtre por categoria e descubra novos pratos
        </Text>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.idCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isSelected = item.strCategory === categoriaSelecionada;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardActive,
                ]}
                onPress={() => handleSelecionarCategoria(item.strCategory)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={styles.categoryImage}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                >
                  {item.strCategory}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {categoriaSelecionada} ({receitas.length})
        </Text>
      </View>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary || '#E85D04'}
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.recipesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhuma receita encontrada para esta categoria.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => abrirDetalhes(item.idMeal)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222222',
  },
  subtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryList: {
    paddingHorizontal: 15,
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginRight: 8,
  },
  categoryCardActive: {
    backgroundColor: theme.colors.primary || '#E85D04',
  },
  categoryImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  loading: {
    marginTop: 40,
  },
  recipesList: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#888888',
  },
});