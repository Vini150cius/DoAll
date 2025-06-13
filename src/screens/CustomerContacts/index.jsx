import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from "firebase/compat/app";
import { ref, set } from "firebase/database";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";

export default function CustomerContacts({ navigation }) {
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);

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
          style={styles.userButton}
          onPress={() => setModalPerfilVisible(true)}
        >
          <Ionicons name="person-circle-outline" size={24} color="white" />
        </TouchableOpacity>

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

              <View style={styles.perfilOpcao}
              onPress={() => (
                  setModalPerfilVisible(false), navigation.navigate("Conta")
                )}>
                <Feather name="user" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Conta</Text>
              </View>
              <View style={styles.perfilOpcao}>
                <Feather name="settings" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Configuração</Text>
              </View>
              <View style={styles.perfilOpcao}>
                <Feather name="book-open" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Guia</Text>
              </View>
              <View style={styles.perfilOpcao}>
                <Feather name="help-circle" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Ajuda</Text>
              </View>

              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.perfilOpcao}
                onPress={() => (
                  setModalPerfilVisible(false),
                  navigation.navigate("InitScreen")
                )}
              >
                <Feather name="log-out" size={20} color="#fff" />
                <Text style={styles.perfilOpcaoText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleContent}>Contatos Salvos</Text>

        <View style={styles.listContainer}>
          <FlatList
      
            
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
