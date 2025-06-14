import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2024",
    color: "#fff",
  },
  header: {
    backgroundColor: "#b18461",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 15,
    marginTop: 40,
    borderRadius: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "flex-start",
    position: "relative",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 13,
    marginVertical: 4,
    color: "#333",
  },

  viewButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  viewButton1: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 20,
  },

  buttonPendentes: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonText1: {
    color: "black",
    fontWeight: "bold",
  },

  perfilModal: {
    backgroundColor: "#a87549", // marrom
    padding: 20,
    borderRadius: 12,
    width: 250,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 50,
    elevation: 5,
  },

  perfilHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  perfilAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  perfilName: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  perfilEmail: {
    fontSize: 14,
    color: "white",
  },

  perfilOpcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  perfilOpcaoText: {
    fontSize: 15,
    color: "white",
  },

  linha: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginVertical: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
  },
  // parte do vinicius
  buttonAddIcon: {
    color: "#000",
    marginBottom: 20,
  },
  buttonAddText: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonAdd: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewCard: {
    flex: 1,
    paddingHorizontal: 5,
  },
  buttonFinished: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonCanceled: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cardFinished: {
    borderWidth: 4,
    borderColor: "#2ecc71",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "flex-start",
    position: "relative",
  },
  cardCanceled: {
    borderWidth: 4,
    borderColor: "#ccc",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "flex-start",
    position: "relative",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default styles;
