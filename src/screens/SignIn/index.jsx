import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { idUser, login } from "../../redux/User/slice";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../config/firebase";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  const dispatch = useDispatch();

  const signIn = () => {
    if (email === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(idUser(user.uid));
      })
      .catch((error) => {
        const errorMessage = error.message;
        Toast.show({
            type: 'error',
            text1: 'Erro ao entrar',
            text2: errorMessage,
        });
      });

    dispatch(login(typeUser));
    navigation.navigate("DrawerApp");
  };

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
          <Text style={styles.typeUser}>
            {typeUser == "client" ? "Cliente" : "Profissional"}
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-addres"
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Você ainda não tem uma conta? {" "}
          <Text
            style={styles.textSignUp}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Criar conta
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
