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
// import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
// import { onValue, ref, set, update } from "firebase/database";
// import { db } from "../../config/firebase";
import {
  createService,
  readService,
  readServices,
  updateServices,
} from "../../services/crud-services";
import { Header } from "../../components/Header";
import { formatOnlyNumbers } from "../../services/format";

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

  async function read(filter = "") {
    setFilter(filter);
    const data = await readServices(idUser);
    if (data) {
      if (typeof data === "object" && data !== null) {
        let feedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        if (filter !== "") {
          feedData = feedData.filter(
            (service) => service.status_service === filter
          );
        }

        setServices(feedData);
      } else {
        setServices([]);
      }
    } else {
      console.log("Nenhum dado encontrado");
      setServices([]);
    }
  }

  function ServiceItem({ data }) {
    return (
      <View
        style={
          data.status_service === "pendente"
            ? styles.card
            : data.status_service === "concluido"
            ? styles.cardFinished
            : styles.cardCanceled
        }
      >
        <View style={styles.info}>
          <Text style={styles.title}>{data.name_client}</Text>
          <Text style={styles.subtitle}>
            Serviço: {data.description_service}
          </Text>
          <Text style={styles.subtitle}>Telefone: {data.phone_client}</Text>
          <Text style={styles.subtitle}>Valor: R$ {data.price_service}</Text>
          <Text style={styles.subtitle}>Status: {data.status_service}</Text>
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

  async function addService() {
    if (
      servicoNome !== "" &&
      servicoDescricao !== "" &&
      servicoTelefone !== "" &&
      servicoValor !== ""
    ) {
      const serviceData = {
        professional_id: idUser,
        description_service: servicoDescricao,
        name_client: servicoNome,
        phone_client: servicoTelefone,
        status_client: "pendente",
        price_service: formatOnlyNumbers(servicoValor),
      };
      const { data, insertError } = await createService(
        serviceData.professional_id,
        null,
        serviceData.description_service,
        serviceData.name_client,
        serviceData.phone_client,
        serviceData.status_client,
        serviceData.price_service
      );
      if (!insertError) {
        setServicoNome("");
        setServicoDescricao("");
        setServicoTelefone("");
        setServicoValor("");
        setModalAddVisible(false);
        read();
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Por favor preencher todos os campos!",
      });
    }
  }

  async function updateServiceStatus(serviceId, status) {
    await updateServices(serviceId, idUser, status);
    read(filter);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={
            filter === "concluido"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onPress={() => toggleFilter("concluido")}
        >
          <Text style={styles.filterButtonTextFinished}>Concluído</Text>
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
          keyExtractor={(item, index) => String(item?.id ?? index)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
      </View>

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
              keyboardType="numeric"
              onChangeText={setServicoTelefone}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Valor do serviço"
              value={servicoValor}
              keyboardType="numeric"
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
