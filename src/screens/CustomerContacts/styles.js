import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContent:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',

  },
  container: {
    flex: 1,
    backgroundColor: "#1c2024",
    color: "#fff",
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
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.01)",
    borderRadius: 20,
  },
  listContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // fundo escurecido
  },
  modalContent: {
    gap: 10,
    margin: 20,
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // sombra em Android
  },
  text: {
    textAlign: 'justify',
  },
  botao: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 700,
  },
  modalContainer1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    maxHeight: '90%',
  },

  modalContent1: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  image1: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },

  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle1: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalText1: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
    textAlign: 'left',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },

  botao2: {
    backgroundColor: '#28a745', // Verde (contratar)
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    padding: 5,
  },

  botao1: {
    backgroundColor: 'red', // Cinza (fechar)
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    padding: 5,
  },

  textoBotao1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTextBold: {
    fontWeight: 'bold',
  },
});
export default styles;