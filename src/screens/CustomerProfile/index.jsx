import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { Header } from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { formatPhone } from "../../services/format";
import updateProfileService, {
  updateProfileWithPassword,
} from "../../services/crud-profile";
import { supabase } from "../../config/supabaseConfig";
import { data as setData } from "../../redux/User/slice";

export default function PerfilCliente({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.data);

  const openEditModal = () => {
    setName(userData?.name ?? "");
    setTelefone(formatPhone(userData?.telefone ?? ""));
    setEmail(userData?.email ?? "");
    setCurrentPassword("");
    setNewPassword("");
    setModalVisible(true);
  };

  async function handleSave() {
    if (!name || !telefone || !email) {
      Toast.show({ type: "error", text1: "Preencha todos os campos." });
      return;
    }

    try {
      setUploading(true);
      const formattedPhone = formatPhone(telefone);
      const response = await updateProfileWithPassword(
        userData.user_id,
        {
          name,
          telefone: formattedPhone,
          email,
        },
        newPassword
      );

      if (response.error) {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar perfil",
          text2: response.error.message,
        });
      } else {
        const updated = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        dispatch(setData(updated));
        Toast.show({ type: "success", text1: "Perfil atualizado" });
      }

      if (response.passwordError) {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar senha",
          text2: response.passwordError.message,
        });
      } else if (newPassword) {
        Toast.show({ type: "success", text1: "Senha atualizada" });
      }

      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao salvar perfil do cliente:", error);
      Toast.show({ type: "error", text1: "Erro ao salvar perfil" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.viewCard}>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{userData.name}</Text>
            <Text style={styles.subtitle}>Email: {userData.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.buttonEditar} onPress={openEditModal}>
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
          <View style={styles.containerForm1}>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Edite o seu nome:</Text>
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
              <Text style={styles.textInput}>Edite o seu telefone:</Text>
              <TextInput
                style={styles.inputName}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#444"
                value={telefone}
                onChangeText={(text) => setTelefone(formatPhone(text))}
                keyboardType="phone-pad"
                editable={!uploading}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Senha atual:</Text>
              <TextInput
                style={styles.inputName}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                editable={!uploading}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.textInput}>Nova senha:</Text>
              <TextInput
                style={styles.inputName}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                editable={!uploading}
              />
            </View>

            <TouchableOpacity
              style={styles.submitForm}
              onPress={handleSave}
              disabled={uploading}
            >
              <Text style={styles.textSubmitForm}>
                {uploading ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalPerfilVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalPerfilVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.perfilModal}>
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
              onPress={() => navigation.navigate("PerfilProf")}
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
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
