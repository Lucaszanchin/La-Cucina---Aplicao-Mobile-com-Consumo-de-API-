import { Linking, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/detalhesReceitaStyles";

export default function VideoButton({ url }) {
  function abrirVideo() {
    Linking.openURL(url);
  }

  return (
    <TouchableOpacity
      style={styles.botaoVideo}
      onPress={abrirVideo}
    >
      <Text style={styles.textoBotao}>
        Ver vídeo
      </Text>
    </TouchableOpacity>
  );
}