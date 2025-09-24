import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { supabase } from "./../../config/supabaseConfig.js";
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
    const profissional_id = data.user_id;
    const cliente_id = dataUser.user_id || dataUser.idUser || dataUser.id;
    const [modalVisible, setModalVisible] = useState(false);
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
      async function checkFavorito() {
        if (!profissional_id || !cliente_id) return;
        const { data: fav, error } = await supabase
          .from("favoritos")
          .select("*")
          .eq("id_profissional", profissional_id)
          .eq("id_cliente", cliente_id)
          .single();
        setFavorito(!!fav);
      }
      checkFavorito();
    }, [profissional_id, cliente_id]);

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={styles.card}>
            <Image source={{ uri: data.photo_url }} style={styles.image} />
            <TouchableOpacity
              onPress={async () => {
                try {
                  if (!profissional_id || !cliente_id) return;
                  if (favorito) {
                    const { error } = await supabase
                      .from("favoritos")
                      .delete()
                      .match({
                        id_profissional: profissional_id,
                        id_cliente: cliente_id,
                      });
                    if (error) {
                      console.error("Erro ao remover favorito:", error);
                      return;
                    }
                    setFavorito(false);
                  } else {
                    const { error } = await supabase.from("favoritos").insert([
                      {
                        id_profissional: profissional_id,
                        id_cliente: cliente_id,
                      },
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
              style={styles.bookmark}
            >
              <FontAwesome
                name={favorito ? "bookmark" : "bookmark-o"}
                size={22}
                color={favorito ? "gold" : "#333"}
              />
            </TouchableOpacity>
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
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.text}>
                &nbsp; A tecnologia é um conceito antigo que remonta aos
                primórdios da humanidade. Ela tem as mais diversas aplicações,
                tanto para o bem quanto para o mal. A tecnologia desempenha um
                papel fundamental no nosso dia-a-dia, especialmente no contexto
                das notícias. Ela também é importante nos meios de comunicação,
                permitindo o acesso à informação em tempo real. Além disso, a
                tecnologia simplifica as tarefas do dia a dia.
              </Text>

              <TouchableOpacity
                style={styles.botao}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoBotao}> Fechar </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
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
    </SafeAreaView>
  );
}
