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
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "react-native-ratings";
import { useSelector } from "react-redux";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../config/firebase";
//! PESSOAL: eu já inseri o firebase e está funcionando, usei esse video como base:https://www.youtube.com/watch?v=q1bxyyKh3Dc, fiz o create e o read, não fiz o resto pq não há necessidade ainda. Não sei se o firebase vcs preferem usar na conta do Zeno para que todos tenham acesso ou na minha conta, mas eu fiz na minha conta. Se vcs preferirem usar a conta do Zeno, é só me avisar que eu coloco lá.
//? A, vcs devem notar uma semelhança com o flatList da Magali, já que eu peguei o código dela...

export default function Teste({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const idUser = useSelector((state) => state.userReducer.idUser);

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

  function Pessoa({ data }) {
    return (
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
      <TouchableOpacity onPress={() => function Favoritar() {
        set(ref(db,'users/profissional/' + idUser + data.id), {
          ...data,
          favorited: !data.favorited,
        });
      }}>
      
        <FontAwesome
          name= {data.favorited ? "bookmark" : "bookmark-o"}
          size={22}
          color={ data.favorited ? "#f1c40f" : "#333"}
          style={styles.bookmark}
        />
      </TouchableOpacity>
    </View>
    );
  }

  const renderItem = ({ item }) => <Pessoa data={item} />;

  function read() {
    const usersRef = ref(db, "users/profissional/");
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
                onPress={() => (
                  setModalPerfilVisible(false), navigation.navigate("Conta")
                )}
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
              <View style={styles.perfilOpcao}>
                <Feather name="help-circle" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Ajuda</Text>
              </View>

              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.perfilOpcao}
                onPress={() => (
                  setModalPerfilVisible(false),
                  navigation.navigate("InitScreen")
                )}
              >
                <Feather name="log-out" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
