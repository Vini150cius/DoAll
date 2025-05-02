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
  title: {
    color: "#fff",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#888",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    fontSize: 18,
    color: "#333E44",
  },
  button: {
    backgroundColor: "#b18461",
    borderRadius: 50,
    paddingVertical: 15,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
  areaPessoa: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5
  },

  textoPessoa: {
    marginBottom: 10,
    color: 'white'
  },

  listaContainer: {
    padding: 10,
  }
});
export default styles;
