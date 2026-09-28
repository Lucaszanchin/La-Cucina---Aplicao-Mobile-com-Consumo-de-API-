import { useState } from "react";
import {View, FlatList, ActivityIndicator} from "react-native";

import SearchBar from "../components/SearchBar";
import ReceitaCard from "../components/ReceitaCard";
import EmptyState from "../components/EmptyState";

import { buscarReceitas } from "../services/receitasService";

export default function BuscaScreen() {
  const [texto, setTexto] = useState("");
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
    <View
      style={{
        flex: 1,
        padding: 15
      }}
    >
      <SearchBar
        valor={texto}
        alterarTexto={setTexto}
        pesquisar={pesquisar}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 20 }}
        />
      )}

      {!loading &&
        pesquisou &&
        receitas.length === 0 && (
          <EmptyState />
        )}

      <FlatList
        data={receitas}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <ReceitaCard receita={item} />
        )}
      />
    </View>
  );
}