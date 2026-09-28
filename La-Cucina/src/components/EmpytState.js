import { View, Text } from "react-native";

export default function EmptyState() {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 40
      }}
    >
      <Text>
        Nenhuma receita encontrada.
      </Text>
    </View>
  );
}