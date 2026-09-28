import { View, TextInput, TouchableOpacity, Text } from "react-native";

export default function SearchBar({
  valor,
  alterarTexto,
  pesquisar
}) {
  return (
    <View>
      <TextInput
        placeholder="Buscar receita..."
        value={valor}
        onChangeText={alterarTexto}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10
        }}
      />

      <TouchableOpacity
        onPress={pesquisar}
        style={{
          backgroundColor: "#ff6b35",
          padding: 12,
          borderRadius: 10
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Buscar
        </Text>
      </TouchableOpacity>
    </View>
  );
}