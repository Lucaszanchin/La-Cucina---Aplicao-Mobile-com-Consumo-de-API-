import { View, Text } from "react-native";

export default function IngredienteItem({
  ingrediente,
  medida,
}) {
  return (
    <View>
      <Text>
        • {ingrediente} - {medida}
      </Text>
    </View>
  );
}