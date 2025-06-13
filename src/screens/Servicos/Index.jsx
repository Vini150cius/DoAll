import React, { useEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../config/firebase";

export default function Services({ navigation }) {
  const idUser = useSelector((state) => state.userReducer.idUser);
  const blabla = "10";
  const [services, setServices] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);

  // Estados para o modal de adicionar serviço
  const [servicoNome, setServicoNome] = useState("");
  const [servicoDescricao, setServicoDescricao] = useState("");
  const [servicoTelefone, setServicoTelefone] = useState("");
  const [servicoValor, setServicoValor] = useState("");

  useEffect(() => {
    read();
    const interval = setInterval(() => {
      read();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function read() {
    const usersRef = ref(db, "users/profissional/" + blabla + "/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const servicesData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setServices(servicesData);
      } else {
        setServices([]);
      }
    });
  }

  function ServiceItem({ data }) {
    return (
      <View style={styles.card}>
        <Image
          source={require("../../../assets/avatar.png")}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{data.nameService}</Text>
          <Text style={styles.subtitle}>Serviço: {data.descService}</Text>
          <Text style={styles.subtitle}>Telefone: {data.phoneService}</Text>
          <Text style={styles.subtitle}>Valor: R$ {data.valueService}</Text>
          <View style={styles.viewButton1}>
            <TouchableOpacity onPress={() => Alert.alert("Serviço Concluído")}>
              <Text style={styles.buttonText1}>Concluído</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Serviço Cancelado")}>
              <Text style={styles.buttonText1}>Cancelar serviço</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }) => <ServiceItem data={item} />;

  function addService() {
    if (
      servicoNome !== "" &&
      servicoDescricao !== "" &&
      servicoTelefone !== "" &&
      servicoValor !== ""
    ) {
      createService();
    } else {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor preencher todos os campos!",
      });
    }
    
    function createService() {
      const idService = blabla + "-" + new Date().getTime();
      set(ref(db, "users/profissional/" + blabla + "/" + idService), {
        nameService: servicoNome,
        descService: servicoDescricao,
        phoneService: servicoTelefone,
        valueService: servicoValor,
      })
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Dados enviados com sucesso!",
          });
          setServicoNome("");
          setServicoDescricao("");
          setServicoTelefone("");
          setServicoValor("");
          setModalAddVisible(false);
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Erro ao enviar dados!",
          });
        });
    }
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

      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => setModalAddVisible(true)}
      >
        <Feather name="plus" size={40} style={styles.buttonAddText} />
        <Text style={styles.buttonAddText}>Adicionar Serviço</Text>
      </TouchableOpacity>

      <View style={styles.viewCard}>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
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

      <Modal
        visible={modalAddVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalAddVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Serviço</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalAddVisible(false)}
              >
                <Feather name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do serviço"
              value={servicoNome}
              onChangeText={setServicoNome}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Descrição"
              value={servicoDescricao}
              onChangeText={setServicoDescricao}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Telefone"
              value={servicoTelefone}
              onChangeText={setServicoTelefone}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Valor do serviço"
              value={servicoValor}
              onChangeText={setServicoValor}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addService}>
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}