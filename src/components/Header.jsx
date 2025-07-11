import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/logout";

export function Header() {
  const navigation = useNavigation(); // Estou adicionando assim pq é a opção mais utilizada e se for utilizar pegando como parametro fica meio feio.
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.menuIcon}
      >
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.searchIcon}>
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.userButton}
        onPress={() => setModalPerfilVisible(true)}
      >
        <Ionicons name="person-circle-outline" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalPerfilVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalPerfilVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setModalPerfilVisible(false)}
        >
          <TouchableOpacity
            style={styles.perfilModal}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.perfilHeader}>
              <Image
                source={require("../../assets/avatar.png")}
                style={styles.perfilAvatar}
              />
              <View>
                <Text style={styles.perfilName}>Cliente</Text>
                <Text style={styles.perfilEmail}>cliente@gmail.com</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.perfilOpcao}
              onPress={() => {
                if (typeUser === "client") {
                  navigation.navigate("Perfil do Cliente");
                } else if (typeUser === "profissional") {
                  navigation.navigate("Perfil do Profissional");
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Tipo do perfil não encontrado",
                    text2: "Saia e entre novamente na sua conta",
                  });
                }
              }}
            >
              <Feather name="user" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perfilOpcao}>
              <Feather name="settings" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Configuração</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perfilOpcao}>
              <Feather name="book-open" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Guia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.perfilOpcao}>
              <Feather name="help-circle" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Ajuda</Text>
            </TouchableOpacity>

            <View style={styles.linha} />

            <TouchableOpacity
              style={styles.perfilOpcao}
              onPress={async () => {
                const response = await logout();
                if (response) {
                  dispatch(logout());
                  setModalPerfilVisible(false);
                  navigation.navigate("InitScreen");
                }
              }}
            >
              <Feather name="log-out" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Sair</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  perfilModal: {
    backgroundColor: "#a87549",
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
});
