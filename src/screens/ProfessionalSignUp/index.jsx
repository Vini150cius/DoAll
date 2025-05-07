import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import { db } from "../../config/firebase";
import Toast from "react-native-toast-message";

export default function ProfessionalSignUp({ navigation }) {
  const [name, setName] = useState("");
  const [services, setServices] = useState("");
  const [sentence, setSentence] = useState("");
  const [file, setFile] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const userId = useSelector((state) => state.userReducer.idUser);
  const typeUser = useSelector((state) => state.userReducer.typeUser);

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
        setFile(imageUri);
        setError(null);
      }
    }
  };

  const serviceTypes = [
    { key: 1, name: "Serviços gerais e manutenção" },
    { key: 2, name: "Limpeza e cuidados" },
    { key: 3, name: "Beleza e estética" },
    { key: 4, name: "Educação e reforço" },
    { key: 5, name: "Tecnologia e criativos" },
    { key: 6, name: "Transporte e logística" },
    { key: 7, name: "Outros serviços úteis" },
  ];

  function submitForm() {
    if (
      name == "" ||
      services == "" ||
      sentence == "" ||
      file == "" ||
      telefone == "" ||
      email == ""
    ) {
      setError("Preencha todos os campos");
      return;
    } else {
      set(ref(db, "users/" + userId), {
        idUser: userId,
        name: name,
        typeUser: typeUser,
        file: file,
        sentence: sentence,
        services: services,
        telefone: telefone,
        email: email,
        serviceType: serviceTypes[selectedType].name,
      })
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: "Dados enviados com sucesso!",
          });
          navigation.navigate("DrawerApp");
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Erro ao enviar dados: " + error.message,
          });
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Conta do profissional</Text>
      </View>
      <View style={styles.containerForm}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Escreva o seu nome</Text>
            <TextInput
              style={styles.inputName}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Escreva os seus serviços</Text>
            <TextInput
              style={styles.inputServices}
              multiline={true}
              numberOfLines={4}
              maxLength={100}
              value={services}
              onChangeText={setServices}
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
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Coloque a sua foto aqui</Text>
            {/* Fonte: https://www.geeksforgeeks.org/how-to-upload-and-preview-an-image-in-react-native/ */}
            <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
              <Feather name="upload-cloud" size={60} color="#888" />
            </TouchableOpacity>
            <View style={styles.containerImage}>
              {file && (
                <Image source={{ uri: file }} style={styles.imageUpload} />
              )}
            </View>
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
            />
            <TextInput
              style={styles.inputEmail}
              placeholder="Email"
              placeholderTextColor="#444"
              value={email}
              onChangeText={setEmail}
            />
            <Picker
              style={styles.picker}
              selectedValue={selectedType}
              onValueChange={(value) => setSelectedType(value)}
            >
              {serviceTypes.map((type, index) => (
                <Picker.Item key={type.key} value={index} label={type.name} />
              ))}
            </Picker>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.submitForm} onPress={submitForm}>
            <Text style={styles.textSubmitForm}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
