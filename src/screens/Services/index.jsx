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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "../../config/firebase";

export default function Services({ navigation }) {
  const idUser = useSelector((state) => state.userReducer.idUser);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("");
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
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  function toggleFilter(filterType) {
    if (filter === filterType) {
      setFilter("");
      read("");
    } else {
      setFilter(filterType);
      read(filterType);
    }
  }

  function read(filter = "") {
    setFilter(filter);
    const usersRef = ref(db, "users/profissional/" + idUser + "/servicos/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let servicesData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        if (filter !== "") {
          servicesData = servicesData.filter(
            (service) => service.statusService === filter
          );
        }

        setServices(servicesData);
      } else {
        setServices([]);
      }
    });
  }

  function ServiceItem({ data }) {
    return (
      <View
        style={
          data.statusService === "pendente"
            ? styles.card
            : data.statusService === "concluido"
            ? styles.cardFinished
            : styles.cardCanceled
        }
      >
        <View style={styles.info}>
          <Text style={styles.title}>{data.nameClient}</Text>
          <Text style={styles.subtitle}>Serviço: {data.descService}</Text>
          <Text style={styles.subtitle}>Telefone: {data.phoneService}</Text>
          <Text style={styles.subtitle}>Valor: R$ {data.valueService}</Text>
          <Text style={styles.subtitle}>Status: {data.statusService}</Text>
        </View>
        <View style={styles.containerActions}>
          <TouchableOpacity
            style={styles.buttonFinished}
            onPress={() => updateServiceStatus(data.id, "concluido")}
          >
            <FontAwesome5 name="check" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCanceled}
            onPress={() => updateServiceStatus(data.id, "cancelado")}
          >
            <Feather name="slash" size={24} color="#fff" />
          </TouchableOpacity>
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
      const idService = idUser + "-" + new Date().getTime();
      set(ref(db, "users/profissional/" + idUser + "/servicos/" + idService), {
        nameClient: servicoNome,
        descService: servicoDescricao,
        phoneService: servicoTelefone,
        valueService: servicoValor,
        statusService: "pendente",
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
          read();
          setModalAddVisible(false);
        })
        .catch((error) => {
          console.log("Erro ao criar serviço:", error);
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Erro ao enviar dados!",
          });
        });
    }
  }

  function updateServiceStatus(serviceId, status) {
    const serviceRef = ref(
      db,
      "users/profissional/" + idUser + "/servicos/" + serviceId
    );
    update(serviceRef, {
      statusService: status,
    })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: `Serviço ${status} com sucesso!`,
        });
        read();
      })
      .catch((error) => {
        console.log("Erro ao atualizar serviço:", error);
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Erro ao atualizar status do serviço!",
        });
      });
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

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={
            filter === "concluido"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => toggleFilter("concluido")}
        >
          <Text style={styles.filterButtonTextFinished}>Concluido</Text>
          <View style={styles.filterIconFinished}>
            <Feather name="check" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            filter === "pendente"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => toggleFilter("pendente")}
        >
          <Text style={styles.filterButtonTextPending}>Andamento</Text>
          <View style={styles.filterIconPending}>
            <Feather name="check" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            filter === "cancelado"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => toggleFilter("cancelado")}
        >
          <Text style={styles.filterButtonTextCanceled}>Cancelado</Text>
          <View style={styles.filterIconCanceled}>
            <Feather name="check" size={20} color="#fff" />
          </View>
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
              placeholder="Nome do cliente"
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
