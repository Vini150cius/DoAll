import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "react-native-ratings";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../config/firebase";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function HomeProf({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [servicoPrestado, setServicoPrestado] = useState("");

  const formatPhone = (telefone) => {
    if (!telefone) return "";
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  useEffect(() => {
    read();
    const interval = setInterval(() => {
      read();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const Profissional = ({ data }) => (
    <View style={styles.card}>
      <Image source={{ uri: data.file }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{data.services}</Text>
        <Text style={styles.subtitle}>{data.sentence}</Text>

        <AirbnbRating
          count={5}
          defaultRating={4}
          size={15}
          showRating={false}
          isDisabled
          selectedColor="#f1c40f"
          starContainerStyle={styles.stars}
        />

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${data.telefone}`);
          }}
        >
          <Text style={styles.phone}>{formatPhone(data.telefone)}</Text>
        </TouchableOpacity>
      </View>
      <FontAwesome
        name="bookmark-o"
        size={22}
        color="#333"
        style={styles.bookmark}
      />
    </View>
  );

  const renderItem = ({ item }) => <Profissional data={item} />;

  function read() {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const feedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setFeed(feedData);
      } else {
        setFeed([]);
      }
    });
  }

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

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonRegistrar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Registrar Serviço Prestado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPendentes}
          onPress={() =>
            Alert.alert(
              "Serviços Pendentes",
              "Aq serão exibidos os serviços pendentes que estão no firebase."
            )
          }
        >
          <Text style={styles.buttonText}>Ver Serviços Pendentes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Serviço Prestado</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Descreva o serviço..."
              value={servicoPrestado}
              onChangeText={setServicoPrestado}
              multiline
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={salvarServico}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

            <View style={styles.perfilOpcao}>
              <Feather name="user" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Conta</Text>
            </View>
            <View style={styles.perfilOpcao}>
              <Feather name="settings" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Configuração</Text>
            </View>
            <View style={styles.perfilOpcao}>
              <Feather name="book-open" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Guia</Text>
            </View>
            <View style={styles.perfilOpcao}>
              <Feather name="help-circle" size={20} color="#fff" />
              <Text style={styles.perfilOpcaoText}>Ajuda</Text>
            </View>

            <View style={styles.linha} />

            <TouchableOpacity
              style={styles.perfilOpcao}
              onPress={() => setModalPerfilVisible(false)}
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
