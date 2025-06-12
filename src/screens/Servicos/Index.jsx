import React, { useState } from "react";
import {
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Servico({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [servicoPrestado, setServicoPrestado] = useState("");

  function salvarServico() {
    //para salvar o serviço prestado no firebase
    Alert.alert("Serviço registrado", `Você adicionou: ${servicoPrestado}`);
    setServicoPrestado("");
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
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
          style={{ marginLeft: 10 }}
          onPress={() => setModalPerfilVisible(true)}
        >
          <MaterialIcons name="person" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.viewCard}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>Trocar de chuveiro</Text>
            <Text style={styles.subtitle}>
              Serviço: trocar o chuveiro por um novo já comprado pelo cliente
            </Text>
            <Text style={styles.subtitle}>Telefone: (11) 99999-9999</Text>
          </View>
          <View style={styles.viewButton1}>
            <TouchableOpacity onPress={() => Alert.alert("Serviço Concluído")}>
              <Text style={styles.buttonText1}>Concluido</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Serviço Cancelado")}>
              <Text style={styles.buttonText1}>Cancelar serviço</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>Fazer encanação</Text>
            <Text style={styles.subtitle}>
              Serviço: fazer toda a encanação do banheiro do cliente
            </Text>
            <Text style={styles.subtitle}>Telefone: (11) 98888-7777</Text>
            <View style={styles.viewButton1}>
              <TouchableOpacity
                onPress={() => Alert.alert("Serviço Concluído")}
              >
                <Text style={styles.buttonText1}>Concluido</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert("Serviço Cancelado")}
              >
                <Text style={styles.buttonText1}>Cancelar serviço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={modalPerfilVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalPerfilVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.perfilModal}>
            <View style={styles.perfilHeader}>
              <Image
                source={require("../../../assets/avatar.png")}
                style={styles.perfilAvatar}
              />
              <View>
                <Text style={styles.perfilName}>Cliente</Text>
                <Text style={styles.perfilEmail}>cliente@gmail.com</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.perfilOpcao}
              onPress={() => navigation.navigate("PerfilProf")}
            >
              <Feather name="user" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Conta</Text>
            </TouchableOpacity>
            <View style={styles.perfilOpcao}>
              <Feather name="settings" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Configuração</Text>
            </View>
            <View style={styles.perfilOpcao}>
              <Feather name="book-open" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Guia</Text>
            </View>
            <TouchableOpacity
              style={styles.perfilOpcao}
              onPress={() => setModalPerfilVisible(false)}
            >
              <Feather name="help-circle" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Ajuda</Text>
            </TouchableOpacity>

            <View style={styles.linha} />

            <TouchableOpacity
              style={styles.perfilOpcao}
              onPress={() => (
                navigation.navigate("InitScreen"), setModalPerfilVisible(false)
              )}
            >
              <Feather name="log-out" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
