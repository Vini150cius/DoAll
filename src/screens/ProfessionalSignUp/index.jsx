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
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { supabase } from "../../config/supabaseConfig";
import { updateProfessionalInfo } from "../../services/crud-professional-info";
import { formatEmail } from "../../services/format";

export default function ProfessionalSignUp({ navigation }) {
  const [name, setName] = useState("");
  const [services, setServices] = useState("");
  const [sentence, setSentence] = useState("");
  const [file, setFile] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [uploading, setUploading] = useState(false);
  const userId = useSelector((state) => state.userReducer.idUser);
  const typeUser = useSelector((state) => state.userReducer.typeUser);

  // Função para comprimir imagem
  const compressImage = async (uri) => {
    try {
      let manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800, height: 800 } }],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
      const fileSizeInMB = fileInfo.size / (1024 * 1024);

      if (fileSizeInMB > 0.5) {
        manipResult = await ImageManipulator.manipulateAsync(
          manipResult.uri,
          [{ resize: { width: 600, height: 600 } }],
          {
            compress: 0.5,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );
      }

      return manipResult.uri;
    } catch (error) {
      console.error("Erro ao comprimir imagem:", error);
      throw error;
    }
  };

  // Função para fazer upload da imagem
  const uploadImageToSupabase = async (imageUri) => {
    try {
      // Comprime a imagem
      const compressedUri = await compressImage(imageUri);
      const fileData = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Cria nome do arquivo organizando por pasta do usuário
      const fileName = `${userId}/profile_${Date.now()}.jpg`;

      const byteCharacters = atob(fileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Upload para Supabase Storage
      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, byteArray, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.error("Erro no upload storage:", error);
        throw error;
      }

      const { data: publicData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      return publicData.publicUrl;
    } catch (error) {
      console.error("Erro no upload:", error);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Precisamos de permissão para acessar a galeria.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setFile(result.assets[0].uri);

        Toast.show({
          type: "info",
          text1: "Imagem selecionada",
          text2: "Pronta para upload!",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao selecionar imagem",
      });
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

  function getServiceTypeByKey(key) {
    return serviceTypes.find((type) => type.key === parseInt(key));
  }

  async function submitForm() {
    if (
      name == "" ||
      services == "" ||
      sentence == "" ||
      file == "" ||
      telefone == "" ||
      email == "" ||
      selectedType == ""
    ) {
      setError("Preencha todos os campos");
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos",
      });
      return;
    }

    try {
      setUploading(true);
      setError("");

      const cleanEmail = formatEmail(email);
      const imageUrl = await uploadImageToSupabase(file);
      const selectedServiceType = getServiceTypeByKey(selectedType);
      if (!selectedServiceType) {
        throw new Error("Tipo de serviço inválido");
      }
      console.log(imageUrl);
      const { updateData, updateError } = await updateProfessionalInfo(
        userId,
        name,
        cleanEmail,
        services,
        sentence,
        telefone,
        imageUrl,
        selectedServiceType.name,
        typeUser
      );
      // const { data: updateData, error: updateError } = await supabase
      //   .from("profiles")
      //   .update({
      //     name,
      //     email,
      //     services,
      //     sentence,
      //     telefone,
      //     photo_url: imageUrl,
      //     service_type: selectedServiceType.name,
      //     type_user: typeUser,
      //     login_completed: true,
      //   })
      //   .eq("user_id", userId)
      //   .select();

      let result = { data: updateData, error: updateError };

      if (!updateError && (!updateData || updateData.length === 0)) {
        result = await supabase
          .from("profiles")
          .insert({
            user_id: userId,
            name,
            email,
            services,
            sentence,
            telefone,
            photo_url: imageUrl,
            service_type: selectedServiceType.name,
            type_user: typeUser,
            login_completed: true,
          })
          .select();
      }

      if (result.error) {
        console.error("Erro ao salvar perfil:", result.error);
        throw result.error;
      }

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Perfil salvo com sucesso!",
      });
      navigation.navigate("DrawerApp");
    } catch (error) {
      console.error("Erro completo:", error);

      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao salvar perfil",
      });
    } finally {
      setUploading(false);
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
            <Picker
              style={styles.picker}
              selectedValue={selectedType}
              onValueChange={(value) => setSelectedType(value)}
              enabled={!uploading}
            >
              <Picker.Item label="Selecione o tipo de serviço" value="" />
              {serviceTypes.map((type) => (
                <Picker.Item
                  key={type.key}
                  value={type.key.toString()}
                  label={type.name}
                />
              ))}
            </Picker>
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[
              styles.submitForm,
              uploading && { backgroundColor: "#ccc" },
            ]}
            onPress={submitForm}
            disabled={uploading}
          >
            <Text style={styles.textSubmitForm}>
              {uploading ? "Salvando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
