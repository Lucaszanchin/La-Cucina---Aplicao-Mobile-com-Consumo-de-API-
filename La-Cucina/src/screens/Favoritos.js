import React, { useState, useCallback } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { obteveFavoritos, removerFavorito } from '../services/favorites';
import MealCard from '../components/MealCard';

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  async function carregarFavoritos() {
    try {
      setCarregando(true);
      const lista = await obteveFavoritos();
      setFavoritos(lista);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar seus favoritos.');
    } finally {
      setCarregando(false);
    }
  }

  function abrirReceita(id) {
    navigation.navigate('RecipeDetail', { mealId: id });
  }

  async function handleRemoverFavorito(idMeal) {
    await removerFavorito(idMeal);
    carregarFavoritos();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Receitas</Text>
        <Text style={styles.titleHighlight}>Favoritas ❤️</Text>
        <Text style={styles.description}>
          Acesse rapidamente os pratos que você mais gostou.
        </Text>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#E85D04" style={styles.loading} />
      ) : favoritos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🍳</Text>
          <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
          <Text style={styles.emptySub}>
            Explore a Home e guarde suas receitas preferidas aqui!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MealCard meal={item} onPress={() => abrirReceita(item.idMeal)} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoverFavorito(item.idMeal)}
              >
                <Text style={styles.removeText}>✕ Remover</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 55,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222222',
  },
  titleHighlight: {
    fontSize: 28,
    fontWeight: '800',
    color: '#E85D04',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#777777',
  },
  loading: {
    marginTop: 40,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    marginBottom: 20,
  },
  removeButton: {
    marginTop: 6,
    alignItems: 'center',
    paddingVertical: 4,
  },
  removeText: {
    fontSize: 12,
    color: '#E85D04',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -40,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  emptySub: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 6,
  },
});