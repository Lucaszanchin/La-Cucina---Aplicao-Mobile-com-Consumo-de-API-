import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FA",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },

  botaoBuscar: {
    backgroundColor: "#E67E22",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  imagem: {
    width: "100%",
    height: 180,
  },

  conteudoCard: {
    padding: 12,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },

  vazioContainer: {
    marginTop: 40,
    alignItems: "center",
  },

  vazioTexto: {
    fontSize: 16,
    color: "#666",
  },

  loading: {
    marginTop: 20,
  },
});