import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import { data as setData } from "../../redux/User/slice";
import { Header } from "../../components/Header";
import updateProfileService from "../../services/crud-profile";
import Toast from "react-native-toast-message";
import { formatPhone } from "../../services/format";

export default function PerfilProf({ navigation }) {
  const [name, setName] = useState("");
  const [services, setServices] = useState("");
  const [sentence, setSentence] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const dataUser = useSelector((state) => state.userReducer.data);

  const dispatch = useDispatch();

  async function handleUpdateProfile() {
    if (!name || !services || !sentence || !telefone || !email) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setUploading(true);
      const formattedPhone = formatPhone(telefone);
      const response = await updateProfileService(dataUser.user_id, {
        name,
        services,
        sentence,
        telefone: formattedPhone,
        email,
      });
      if (response.error) {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar perfil.",
          text2: response.error.message,
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Perfil atualizado com sucesso.",
        });
        if (response.data) {
          dispatch(setData(response.data));
        }
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar perfil.",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.viewCard}>
        <View style={styles.card}>
          <Image source={{ uri: dataUser.photo_url }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{dataUser.name}</Text>
            <Text style={styles.subtitle}>Serviços: {dataUser.services}</Text>
            <Text style={styles.subtitle}>
              Frase de Efeito: "{dataUser.sentence}"
            </Text>
            <Text style={styles.subtitle}>Email: {dataUser.email}</Text>
            <Text style={styles.subtitle}>Telefone: {dataUser.telefone}</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonRegistrar}
          onPress={() => {
            setName(dataUser?.name ?? "");
            setServices(dataUser?.services ?? "");
            setSentence(dataUser?.sentence ?? "");
            setTelefone(formatPhone(dataUser?.telefone ?? ""));
            setEmail(dataUser?.email ?? "");
            setError("");
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.containerForm}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Escreva o seu nome</Text>
              <TextInput
                style={styles.inputName}
                placeholder="Ex: João da Silva"
                placeholderTextColor="#444"
                value={name}
                onChangeText={setName}
                editable={!uploading}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Escreva os seus serviços</Text>
              <TextInput
                style={styles.inputServices}
                multiline={true}
                numberOfLines={4}
                maxLength={100}
                placeholder="Ex: Corte, Coloração, Escova"
                placeholderTextColor="#444"
                value={services}
                onChangeText={setServices}
                editable={!uploading}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Escreva sua frase de efeito</Text>
              <TextInput
                style={styles.inputSentence}
                placeholder="Ex: Cuidar do seu cabelo é minha arte."
                placeholderTextColor="#444"
                value={sentence}
                onChangeText={setSentence}
                editable={!uploading}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>
                Como os clientes podem entrar em contato com você?
              </Text>
              <TextInput
                style={styles.inputFone}
                placeholder="Telefone"
                placeholderTextColor="#444"
                value={telefone}
                onChangeText={(text) => setTelefone(formatPhone(text))}
                keyboardType="phone-pad"
                editable={!uploading}
              />
              <TextInput
                style={styles.inputEmail}
                placeholder="Email"
                placeholderTextColor="#444"
                value={email}
                onChangeText={setEmail}
                editable={!uploading}
              />
            </View>
            <TouchableOpacity
              style={styles.submitForm}
              onPress={async () => {
                await handleUpdateProfile();
              }}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.textSubmitForm}>Salvar</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </Modal>

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
