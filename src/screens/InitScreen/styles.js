import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerEmpty: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerInfo: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  infos: {
    alignItems: "center",
    margin: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: 700,
    color: "#E4E4E4",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 25,
    color: "#E4E4E4",
    textAlign: "center",
  },
  button: {
    fontSize: 45,
    backgroundColor: '#333E44',
    borderCurve: 100,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 40,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 25,
  },
  textButton:{
    fontSize: 25,
    fontWeight: 700,
    color: '#E4E4E4',
  }
});
export default styles;
