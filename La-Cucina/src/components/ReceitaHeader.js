import { View, Text, Image } from "react-native";
import { styles } from "../styles/detalhesReceitaStyles";

export default function ReceitaHeader({ receita }) {
  return (
    <View>
      <Image
        source={{ uri: receita.strMealThumb }}
        style={styles.imagem}
      />

      <Text style={styles.titulo}>
        {receita.strMeal}
      </Text>

      <Text style={styles.info}>
        {receita.strCategory}
      </Text>

      <Text style={styles.info}>
        {receita.strArea}
      </Text>
    </View>
  );
}