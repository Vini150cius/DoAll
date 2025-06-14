import React, { useState } from "react";
import {
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function PerfilProf({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [servicoPrestado, setServicoPrestado] = useState("");

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
          style={{ marginLeft: 10 }}
          onPress={() => setModalPerfilVisible(true)}
        >
          <MaterialIcons name="person" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.viewCard}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>Nome do Profissional</Text>
            <Text style={styles.subtitle}>Serviços: Corte, Coloração</Text>
            <Text style={styles.subtitle}>
              Frase de Efeito: "Seu cabelo, sua arte"
            </Text>
            <Text style={styles.subtitle}>Email: profissional@gmail.com</Text>
            <Text style={styles.subtitle}>Telefone: (11) 99999-9999</Text>
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
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Escreva sua frase de efeito</Text>
              <TextInput
                style={styles.inputSentence}
                placeholder="Ex: Cuidar do seu cabelo é minha arte."
                placeholderTextColor="#444"
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Coloque a sua foto aqui</Text>
              {/* Fonte: https://www.geeksforgeeks.org/how-to-upload-and-preview-an-image-in-react-native/ */}
              <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
                <Feather name="upload-cloud" size={60} color="#888" />
              </TouchableOpacity>
              {/* <View style={styles.containerImage}>
                {file && (
                  <Image source={{ uri: file }} style={styles.imageUpload} />
                )}
              </View> */}
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>
                Como os clientes podem entrar em contato com você?
              </Text>
              <TextInput
                style={styles.inputFone}
                placeholder="Telefone"
                placeholderTextColor="#444"
              />
              <TextInput
                style={styles.inputEmail}
                placeholder="Email"
                placeholderTextColor="#444"
              />
              {/* <Picker
                style={styles.picker}
                selectedValue={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                {serviceTypes.map((type, index) => (
                  <Picker.Item key={type.key} value={index} label={type.name} />
                ))}
              </Picker> */}
            </View>
            <TouchableOpacity
              style={styles.submitForm}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textSubmitForm}>Salvar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
