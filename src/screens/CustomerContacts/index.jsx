import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "./../../config/supabaseConfig.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AirbnbRating } from "react-native-ratings";
import { useSelector } from "react-redux";
import { readProfessionals } from "../../services/crud-professional-info";
import { getFavoritesByClienteId } from "../../services/crud-favoritos";

export default function CustomerContacts({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const dataUser = useSelector((state) => state.userReducer.data);

  useEffect(() => {
    read();
  }, []);


  function Pessoa({ data }) {
    const profissional_id = data.user_id;
    const cliente_id = dataUser.user_id || dataUser.idUser || dataUser.id;
    const [modalVisible, setModalVisible] = useState(false);
    const [favorito, setFavorito] = useState(false);
    const modalVisibleRef = useRef(false);

    useEffect(() => {
      modalVisibleRef.current = modalVisible;
      console.log(data);
    }, [modalVisible]);

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

    useEffect(() => {
      if (modalVisibleRef.current && !modalVisible) {
        setModalVisible(true);
      }
    }, [data]);

    return (
      <>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            setModalVisible(true);
          }}
        >
          <View style={styles.card}>
            <Image source={{ uri: data.photo_url }} style={styles.image} />
            <TouchableOpacity
              onPress={async (e) => {
                e.stopPropagation();
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
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer1}>
            <View style={styles.modalContent1}>
              <ScrollView>
                <Image source={{ uri: data.photo_url }} style={styles.image1} />
                <Text style={styles.title1}>{data.services}</Text>
                <Text style={styles.subtitle1}>{data.sentence}</Text>
                <Text style={styles.modalText1}>
                  <Text style={styles.modalTextBold}>Email:</Text> {data.email}
                </Text>
                <Text style={styles.modalText1}>
                  <Text style={styles.modalTextBold}>Telefone:</Text>{" "}
                  {data.telefone}
                </Text>
                <Text style={styles.modalText1}>
                  <Text style={styles.modalTextBold}>Tipo de serviço:</Text>{" "}
                  {data.service_type}
                </Text>
                <Text style={styles.modalText1}>
                  <Text style={styles.modalTextBold}>Serviços feitos:</Text>{" "}
                  colocar os servicos que estão na tabela services
                </Text>
              </ScrollView>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.botao2} onPress={() => {}}>
                  <Text style={styles.textoBotao1}> Contratar serviços </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botao1}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textoBotao1}> Fechar </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  const renderItem = ({ item }) => <Pessoa data={item} />;

  async function read() {
    const cliente_id = dataUser?.user_id || dataUser?.idUser || dataUser?.id;
    setLoading(true);
    if (cliente_id) {
      const { favorites, error } = await getFavoritesByClienteId(cliente_id);
      if (error) {
        console.error("Erro ao obter favoritos:", error);
      }

      if (favorites && Array.isArray(favorites) && favorites.length > 0) {
        const feedData = favorites.map((f) => {
          const profile = f.profile || {};
          return {
            id:
              f.id || profile.user_id || `${f.id_profissional}_${f.id_cliente}`,
            user_id: profile.user_id || f.id_profissional,
            photo_url: profile.photo_url,
            services: profile.services,
            sentence: profile.sentence,
            email: profile.email,
            telefone: profile.telefone,
            service_type: profile.service_type,
          };
        });
        setFeed(feedData);
        setLoading(false);
        return;
      }
    }

    const { dataFreelancers, error } = await readProfessionals();

    if (error) {
      console.error("Erro:", error);
      setLoading(false);
      return;
    }
    if (dataFreelancers) {
      if (Array.isArray(dataFreelancers)) {
        setFeed(dataFreelancers);
      } else if (
        typeof dataFreelancers === "object" &&
        dataFreelancers !== null
      ) {
        const feedData = Object.keys(dataFreelancers).map((key) => ({
          id: key,
          ...dataFreelancers[key],
        }));

        setFeed(feedData);
        setLoading(false);
      } else {
        setFeed([]);
        setLoading(false);
      }
    } else {
      console.log("Nenhum dado encontrado");
      setFeed([]);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.titleContent}>Cntatos Salvos</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={feed}
            keyExtractor={(item, index) => String(item?.id ?? index)}
            renderItem={renderItem}
            contentContainerStyle={styles.listInnerContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {loading ? "Carregando..." : "Nenhum dado encontrado"}
              </Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
