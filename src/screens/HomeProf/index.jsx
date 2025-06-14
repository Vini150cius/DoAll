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
    const usersRef = ref(db, "users/client/");
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

      <View style={styles.listContainer}>
        <Text style={styles.listCliente}>Lista de Clientes</Text>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>Mariana Peneira</Text>
            <Text style={styles.subtitle}>
              Queda de energia constante em dois cômodos da casa. Suspeita de
              fiação antiga.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonAgree}>
                <Text style={styles.buttonText}>Aceitar</Text>
                <FontAwesome name="check" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonReject}>
                <Text style={styles.buttonText}>Recusar</Text>
                <FontAwesome name="remove" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <FlatList
          data={feed}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        /> */}
      </View>

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
              onPress={() => navigation.navigate("Perfil do Profissional")}
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
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
