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
  stars: {
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  phone: {
    color: "#007BFF",
    fontSize: 13,
  },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  listContainer: {
    flex: 1,
  },
});

export default styles;