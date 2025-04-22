import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { typeUser } from "../../redux/User/slice";

export default function SignIn({ navigation }) {
  const typeUser = useSelector((state) => state.userReducer.typeUser);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunity name="keyboard-backspace" size={30} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.welcome}>Bem vindo</Text>
          <Text style={styles.typeUser}>{typeUser == "client" ? "Cliente" : "Profissional" }</Text>
        </View>
      </View>
      <View style={styles.formContainer}></View>
    </SafeAreaView>
  );
}
