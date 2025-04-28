import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333E44",
  },
  header: {
    flex: 1,
    padding: 25,
    backgroundColor: "#b18461",
    borderBottomLeftRadius: 40,
  },
  formContainer: {
    flex: 5,
    paddingHorizontal: 35,
    alignContent: "center",
    justifyContent: "center",
  },
  titleContainer: {
    paddingLeft: "20",
    paddingTop: "5",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 27,
    fontWeight: "900",
  },
  typeUser: {
    fontSize: 17,
  },
  backButton: {
    paddingTop: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E4E4E4",
    paddingBottom: 5,
  },
  input: {
    backgroundColor: "#888",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    color: "#333E44",
  },
});
export default styles;
