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
import { Header } from "../../components/Header";

export default function PerfilCliente({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);

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
            <Text style={styles.title}>Nome do Cliente</Text>
            <Text style={styles.subtitle}>Email: cliente@gmail.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonEditar}
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
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Escreva o seu nome</Text>
            <TextInput
              style={styles.inputName}
              placeholder="Ex: João da Silva"
              placeholderTextColor="#444"
            />
          </View>

          <TouchableOpacity
            style={styles.submitForm}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textSubmitForm}>Salvar</Text>
          </TouchableOpacity>
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
