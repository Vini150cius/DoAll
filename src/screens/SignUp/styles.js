import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333E44",
  },
  header: {
    padding: 25,
    backgroundColor: "#b18461",
    borderBottomLeftRadius: 40,
    minHeight: 150,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  titleContainer: {
    paddingLeft: 20,
    paddingTop: 5,
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
  button: {
    fontSize: 35,
    backgroundColor: "#b18461",
    borderCurve: 100,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 50,
    width: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  textButton: {
    fontSize: 25,
    fontWeight: "700",
    color: "#E4E4E4",
  },
  textSignIn: {
    fontSize: 18,
    fontWeight: "700",
    color: "#b18461",
    textDecorationLine: "underline",
  },
  text: {
    color: "#E4E4E4",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  error: {
    color: "#FF0000",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default styles;