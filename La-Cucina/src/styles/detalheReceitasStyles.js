import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 15,
  },

  imagem: {
    width: "100%",
    height: 250,
    borderRadius: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  info: {
    fontSize: 15,
    color: "#666",
    marginTop: 3,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  instrucoes: {
    fontSize: 15,
    lineHeight: 24,
  },

  botaoVideo: {
    backgroundColor: "#E67E22",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
  },

  textoBotao: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});