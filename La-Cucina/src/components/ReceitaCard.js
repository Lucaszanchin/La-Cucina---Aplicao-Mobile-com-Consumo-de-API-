import { View, Text, Image } from "react-native";

export default function ReceitaCard({ receita }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginTop: 15,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 3
      }}
    >
      <Image
        source={{ uri: receita.strMealThumb }}
        style={{
          width: "100%",
          height: 180
        }}
      />

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          {receita.strMeal}
        </Text>

        <Text>
          Categoria: {receita.strCategory}
        </Text>

        <Text>
          Origem: {receita.strArea}
        </Text>
      </View>
    </View>
  );
}