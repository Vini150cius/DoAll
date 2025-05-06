import { useState } from "react";
import {
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

export default function ProfessionalSignUp({ navigation }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Desculpe, precisamos de permissão para acessar a galeria.",
      });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setFile(result.uri);
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
    function create(user) {
      set(ref(db, "users/" + user.uid), {
        idUser: user.uid,
        name: name.trim(),
        typeUser: typeUser,
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
        <ScrollView style={styles.scrollView}>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Escreva o seu nome</Text>
            <TextInput style={styles.inputName} />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Escreva os seus serviços</Text>
            <TextInput
              style={styles.inputServices}
              multiline={true}
              numberOfLines={4}
              maxLength={100}
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
            {file && (
              <Image source={{ uri: file }} style={styles.imageUpload} />
            )}
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
          <TouchableOpacity style={styles.submitForm} onPress={submitForm}>
            <Text style={styles.textSubmitForm}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
