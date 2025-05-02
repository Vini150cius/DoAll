import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { onValue, ref, set } from "firebase/database";
import axios from "axios";
import { db } from "../../config/firebase";
import Toast from "react-native-toast-message";

//! PESSOAL: eu já inseri o firebase e está funcionando, usei esse video como base:https://www.youtube.com/watch?v=q1bxyyKh3Dc, fiz o create e o read, não fiz o resto pq não há necessidade ainda. Não sei se o firebase vcs preferem usar na conta do Zeno para que todos tenham acesso ou na minha conta, mas eu fiz na minha conta. Se vcs preferirem usar a conta do Zeno, é só me avisar que eu coloco lá. 
//? A, vcs devem notar uma semelhança com o flatList da Magali, já que eu peguei o código dela...


export default function Home({ navigation }) {
  const [text, setText] = useState("");
  const [feed, setFeed] = useState([]);
  const idUser = useSelector((state) => state.userReducer.idUser);

  useEffect(() => {
    read();
    const interval = setInterval(() => {
      read();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const Pessoa = ({ data }) => (
    <View style={styles.areaPessoa}>
      <Text style={styles.textoPessoa}>idUser: {data.idUser}</Text>
      <Text style={styles.textoPessoa}>Texto: {data.text}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Pessoa data={item} />;

  function create() {
    const id = idUser + "-" + new Date().getTime(); 
    set(ref(db, "feed/" + id), {
      text: text,
      idUser: idUser,
    })
      .then(() => {
        setText("");
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Dados enviados com sucesso!",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Erro ao enviar dados!",
        });
      });
  }

  function read() {
    const startCountRef = ref(db, "feed/");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const feedData = Object.keys(data).map((key) => ({
        id: key, 
        idUser: key, 
        text: data[key].text,
        ...data[key],
      }));
      setFeed(feedData);
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
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Home Screen {idUser}</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Digite seu texto aqui"
        />
        <TouchableOpacity style={styles.button} onPress={create}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
