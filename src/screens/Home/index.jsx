import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
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
import Toast from "react-native-toast-message";
import {
  createService,
  readServicesDone,
} from "../../services/crud-services.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import CurrencyInput from "react-native-currency-input";

export default function Home({ navigation }) {
  const [feed, setFeed] = useState([]);
  const dataUser = useSelector((state) => state.userReducer.data);

  useEffect(() => {
    read();
  }, []);

  async function handleCreateService(
    profissional_id,
    client_id,
    description_service,
    price_service,
    service_date,
    status_service = "em_analise",
    name_client = dataUser.name,
    phone_client = numberService
  ) {
    try {
      if (!profissional_id || !client_id) {
        throw new Error("IDs de profissional ou cliente inválidos");
      }

      if (
        !description_service ||
        !price_service ||
        !service_date ||
        !status_service ||
        !name_client ||
        !phone_client
      ) {
        throw new Error("Dados do serviço inválidos");
      }

      const response = await createService(
        profissional_id,
        client_id,
        description_service,
        name_client,
        phone_client,
        status_service,
        price_service,
        service_date
      );
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar serviço",
        text2: err.message || "Erro desconhecido",
      });
    }
  }

  function Pessoa({ data }) {
    const profissional_id = data.user_id;
    const cliente_id = dataUser.user_id || dataUser.idUser || dataUser.id;
    const [modalVisible, setModalVisible] = useState(false);
    const [serviceVisible, setServiceVisible] = useState(false);
    const [favorito, setFavorito] = useState(false);
    const [description_service, setDescriptionService] = useState("");
    const [price_service, setPriceService] = useState(0);
    const [service_date, setServiceDate] = useState(new Date());
    const [numberService, setNumberService] = useState(dataUser.telefone || "");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [servicesDone, setServicesDone] = useState([]);
    const modalVisibleRef = useRef(false);

    useEffect(() => {
      modalVisibleRef.current = modalVisible;
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
      if (modalVisible) {
        async function fetchServicesDone() {
          try {
            const response = await readServicesDone(profissional_id);
            setServicesDone(Array.isArray(response) ? response : []);
          } catch (err) {
            setServicesDone([]);
          }
        }
        fetchServicesDone();
      }
    }, [modalVisible, profissional_id]);

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
                <View style={styles.bulletList}>
                  <Text style={styles.modalTextBold}>Serviços feitos:</Text>
                  {servicesDone.length === 0 ? (
                    <Text style={styles.modalText1}>
                      Nenhum serviço concluído.
                    </Text>
                  ) : (
                    <View>
                      {servicesDone.map((serv, idx) => (
                        <View key={serv.id || idx} style={styles.bulletItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.modalText1}>
                            {serv.description_service}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.botao2}
                  onPress={() => {
                    setServiceVisible(true);
                    setModalVisible(false);
                  }}
                >
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={serviceVisible}
        >
          <View style={styles.modalContainer1}>
            <View style={styles.modalContent1}>
              <View>
                <Text style={styles.titleModal1}>Contratar Serviço</Text>
              </View>
              <ScrollView>
                <Text>Número para contato: </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="(xx) xxxxx-xxxx"
                  value={numberService}
                  onChangeText={(text) => setNumberService(formatPhone(text))}
                  keyboardType="phone-pad"
                />
                <Text>Descrição do serviço: </Text>
                <TextInput
                  style={styles.modalInput1}
                  placeholder="Descrição do serviço"
                  value={description_service}
                  onChangeText={setDescriptionService}
                />
                <Text>Preço do serviço: </Text>
                <CurrencyInput
                  style={styles.modalInput}
                  prefix="R$ "
                  delimiter="."
                  separator=","
                  precision={2}
                  minValue={0}
                  value={price_service}
                  onChangeValue={setPriceService}
                />
                <Text>Data do serviço: </Text>
                <TouchableOpacity
                  style={styles.modalInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>
                    {service_date
                      ? service_date.toLocaleDateString()
                      : "Selecionar data"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    display="default"
                    value={service_date}
                    onChange={(event, selectedDate) => {
                      if (event.type === "set" && selectedDate) {
                        setServiceDate(selectedDate);
                        setShowDatePicker(false);
                      } else if (event.type === "dismissed") {
                        setShowDatePicker(false);
                      }
                    }}
                    mode="date"
                  />
                )}
              </ScrollView>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.botao2}
                  onPress={async () => {
                    await handleCreateService(
                      profissional_id,
                      cliente_id,
                      description_service,
                      price_service,
                      service_date,
                      undefined,
                      undefined,
                      numberService
                    );
                    setServiceVisible(false);
                    setDescriptionService("");
                    setPriceService(0);
                    setNumberService(dataUser.telefone || "");
                    setServiceDate(new Date());
                    setStatusService("em_analise");
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.textoBotao1}> Contratar serviços </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botao1}
                  onPress={() => setServiceVisible(false)}
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
          keyExtractor={(item, index) => String(item?.id ?? index)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum dado encontrado</Text>
          }
          refreshing={false}
          onRefresh={read}
        />
      </View>
    </SafeAreaView>
  );
}
