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
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "react-native-ratings";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../config/firebase";

//! PESSOAL: eu já inseri o firebase e está funcionando, usei esse video como base:https://www.youtube.com/watch?v=q1bxyyKh3Dc, fiz o create e o read, não fiz o resto pq não há necessidade ainda. Não sei se o firebase vcs preferem usar na conta do Zeno para que todos tenham acesso ou na minha conta, mas eu fiz na minha conta. Se vcs preferirem usar a conta do Zeno, é só me avisar que eu coloco lá.
//? A, vcs devem notar uma semelhança com o flatList da Magali, já que eu peguei o código dela...

export default function Teste({ navigation }) {
  const [feed, setFeed] = useState([]);

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

  const Pessoa = ({ data }) => (
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
      <FontAwesome name="bookmark-o" size={22} color="#333" style={styles.bookmark} />
    </View>
  );

  const renderItem = ({ item }) => <Pessoa data={item} />;

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

  return (
  typeUser === 'client' ? (
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
    </SafeAreaView>
    //daqui para baixo não mexer pretinho
  ) : (
    //pretinho não mexer
    <View>
      <Text>Você não é um cliente.</Text>
    </View>
  )
);
}
