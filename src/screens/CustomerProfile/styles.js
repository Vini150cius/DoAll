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
   userButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
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
  titleContent: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",

  },
});
export default styles;