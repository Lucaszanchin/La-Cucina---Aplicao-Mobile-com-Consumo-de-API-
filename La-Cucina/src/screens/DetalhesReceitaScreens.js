import { useEffect, useState } from "react";
import {ScrollView, Text, ActivityIndicator } from "react-native";

import ReceitaHeader from "../components/ReceitaHeader";
import IngredienteItem from "../components/IngredientesItem";
import VideoButton from "../components/VideoButton";

import { buscarReceitaPorId } from "../services/receitasService";
import { styles } from "../styles/detalhesReceitaStyles";

export default function DetalhesReceitaScreen({
  route,
}) {
  const { idMeal } = route.params;
  const [receita, setReceita] = useState(null);
  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados =
      await buscarReceitaPorId(idMeal);
    setReceita(dados);
  }

  if (!receita) {
    return <ActivityIndicator />;
  }

  const ingredientes = [];

  for (let i = 1; i <= 20; i++) {
    const ingrediente =
      receita[`strIngredient${i}`];

    const medida =
      receita[`strMeasure${i}`];

    if (
      ingrediente &&
      ingrediente.trim()
    ) {
      ingredientes.push({
        ingrediente,
        medida,
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ReceitaHeader receita={receita} />

      <Text style={styles.subtitulo}>
        Ingredientes
      </Text>

      {ingredientes.map((item, index) => (
        <IngredienteItem
          key={index}
          ingrediente={item.ingrediente}
          medida={item.medida}
        />
      ))}

      <Text style={styles.subtitulo}>
        Modo de preparo
      </Text>

      <Text style={styles.instrucoes}>
        {receita.strInstructions}
      </Text>

      {receita.strYoutube && (
        <VideoButton
          url={receita.strYoutube}
        />
      )}
    </ScrollView>
  );
}