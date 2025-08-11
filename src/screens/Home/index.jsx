import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { supabase } from "./../../config/supabaseConfig.js"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "react-native-ratings";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { formatPhone } from "../../services/format";
import { readProfessionals } from "../../services/crud-professional-info";

export default function Home({ navigation }) {
  const [feed, setFeed] = useState([]);
  const dataUser = useSelector((state) => state.userReducer.data);

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
        <Image source={{ uri: data.photo_url }} style={styles.image} />
        <View style={styles.info}>
          <Text></Text>
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
  onPress={async () => {
    try {
      if (favorito) {
        // REMOVER dos favoritos
        const { error } = await supabase
          .from("favoritos")
          .delete()
          .match({
            profissional_id,
            cliente_id
          });

        if (error) {
          console.error("Erro ao remover favoritos:", error);
          return;
        }

        setFavorito(false);
      } else {
        // ADICIONAR aos favoritos
        const { error } = await supabase
          .from("favoritos")
          .insert([
            {
              profissional_id,
              cliente_id
            }
          ]);

        if (error) {
          console.error("Erro ao salvar favorito:", error);
          return;
        }

        setFavorito(true);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    }
  }}
>
  <FontAwesome
    name={favorito ? "bookmark" : "bookmark-o"}
    size={22}
    color={favorito ? "gold" : "#333"}
    style={styles.bookmark}
  />
</TouchableOpacity>



        </View>

        <TouchableOpacity onPress={() => console.log("Favorito clicado")}>
          <FontAwesome
            name="bookmark-o"
            size={22}
            color="#333"
            style={styles.bookmark}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => <Pessoa data={item} />;

  async function read() {
    const { dataFreelancers, error } = await readProfessionals();

    if (error) {
      console.error("Erro:", error);
      return;
    } 
    if (dataFreelancers) {
      if (typeof dataFreelancers === "object" && dataFreelancers !== null) {
        const feedData = Object.keys(dataFreelancers).map((key) => ({
          id: key,
          ...dataFreelancers[key],
        }));

        setFeed(feedData);
      } else {
        setFeed([]);
      }
    } else {
      console.log("Nenhum dado encontrado");
      setFeed([]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.listContainer}>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
        />
      </View>
      <View>
        <Text style={{ color: "white" }}>{dataUser.name}</Text>
        <Text style={{ color: "white" }}>{dataUser.photo_url}</Text>
      </View>
    </SafeAreaView>
  );
}
