import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header";

export default function PerfilProf({ navigation }) {
  const [name, setName] = useState("");
  const [services, setServices] = useState("");
  const [sentence, setSentence] = useState("");
  const [file, setFile] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [servicoPrestado, setServicoPrestado] = useState("");
  const dataUser = useSelector((state) => state.userReducer.data);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Desculpe, precisamos de permissão para acessar a galeria.",
      });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri = result.assets ? result.assets[0].uri : result.uri;
        const base64Image = await convertImageToBase64(imageUri);
        if (base64Image) {
          setFile(base64Image);
          setError(null);
        }
      }
    }
  };

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
          onPress={() => setModalVisible(true)}
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
              <Text style={styles.textInput}>Coloque a sua foto aqui</Text>
              {/* Fonte: https://www.geeksforgeeks.org/how-to-upload-and-preview-an-image-in-react-native/ */}
              <TouchableOpacity
                style={styles.buttonUpload}
                onPress={pickImage}
                disabled={uploading}
              >
                <Feather
                  name={uploading ? "clock" : "upload-cloud"}
                  size={60}
                  color={uploading ? "#ccc" : "#888"}
                />
                {uploading && (
                  <Text style={styles.uploadingText}>Processando...</Text>
                )}
              </TouchableOpacity>
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
                onChangeText={setTelefone}
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
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textSubmitForm}>Salvar</Text>
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
