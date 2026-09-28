import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ReceitasScreen from '../screens/ReceitasScreen';
import BuscaScreen from '../screens/BuscaScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import Favoritos from '../screens/Favoritos';
import { theme } from '../styles/theme';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Recipes" component={ReceitasScreen} options={{ title: 'Lista de Receitas' }} />
      <Stack.Screen name="Busca" component={BuscaScreen} options={{ title: 'Buscar Receita' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Detalhes da Receita' }} />
      <Stack.Screen name="Favorites" component={Favoritos} options={{ title: 'Minhas Favoritas' }} />
    </Stack.Navigator>
  );
}