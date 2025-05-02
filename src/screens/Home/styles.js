import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2024",
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




  areaPessoa: {
    border: '2px solid white',
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
    backgroundColor: '#121'
  }
});
export default styles;
