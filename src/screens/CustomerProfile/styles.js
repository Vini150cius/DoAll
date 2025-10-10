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

  textoNavBar: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 15,
    height: 40,
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

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  modalContainer1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  modalButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  modalButtonText: {
    color: "#fff",
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

  buttonEditar:{
    backgroundColor: 'blue',
    padding: 15,
    borderRadius:10
  },

   containerForm: { 
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    maxHeight: '90%', 
  },

  containerForm1: {
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

  containerInput: {
    marginBottom: 20,
  },

  textInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  inputName: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "lightgray",
    width: 200
  },

  

  submitForm: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  textSubmitForm: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
