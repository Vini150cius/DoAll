import React, { use, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Header } from "../../components/Header";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  readServicesWithStatus,
  updateStatusOfService,
} from "../../services/crud-service-professional";
import Toast from "react-native-toast-message";

export default function HomeProf({ navigation }) {
  const dataUser = useSelector((state) => state.userReducer.data);
  const idUser = dataUser.user_id || dataUser.idUser || dataUser.id;
  const [feed, setFeed] = useState([]);

  async function read() {
    const { data: dataFutureServices, error } = await readServicesWithStatus(
      idUser,
      "em_analise"
    );
    console.log(dataFutureServices);
    if (error) {
      console.error("Erro:", error);
      return;
    }
    if (dataFutureServices) {
      if (
        typeof dataFutureServices === "object" &&
        dataFutureServices !== null
      ) {
        const feedData = Object.keys(dataFutureServices).map((key) => ({
          id: key,
          ...dataFutureServices[key],
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

  async function updateStatus(id, accepted) {
    const newStatus = accepted ? "pendente" : "recusado";
    const { data, error } = await updateStatusOfService(id, newStatus);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível atualizar o status do serviço.",
      });
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Status do serviço atualizado com sucesso.",
      });
      return;
    }
    await read();
  }

  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      read();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const Service = ({ data }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            data.profiles.photo_url ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>Cliente: {data.name_client}</Text>
        <Text style={styles.subtitle}>Serviço: {data.description_service}</Text>
        <Text style={styles.value}>
          Valor: R$ {data.price_service.toFixed(2).toLocaleString("pt-BR")}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonAgree}
            onPress={() => updateStatus(data.id, true)}
          >
            <Text style={styles.buttonText}>Aceitar</Text>
            <FontAwesome name="check" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReject}
            onPress={() => updateStatus(data.id, false)}
          >
            <Text style={styles.buttonText}>Recusar</Text>
            <FontAwesome name="remove" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Service data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.listContainer}>
        <Text style={styles.listCliente}>Lista de Clientes</Text>

        <FlatList
          data={feed}
          keyExtractor={(item, index) => String(item?.id ?? index)}
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
