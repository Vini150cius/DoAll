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
  }
});
export default styles;
