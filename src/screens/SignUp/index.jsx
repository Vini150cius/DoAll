import React, { useEffect, useState } from "react";
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
import { login } from "../../redux/User/slice";
import {
  getAuth,
  createUserWithEmailAndPassword} from "firebase/auth";
import { app } from "../../config/firebase";
import Toast from "react-native-toast-message";

// Documentação sobre o firebase: https://firebase.google.com/docs/auth/web/start?hl=pt-br#web_2

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  const dispatch = useDispatch();

  const signUp = () => {
    if (email === "" || password === "" || confirmPassword === "") {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não são iguais");
      return;
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login(typeUser));
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Toast.show({
            type: 'error',
            text1: 'Erro ao entrar',
            text2: errorMessage,
        });
      });
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
        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Já tem uma conta?{" "}
          <Text
            style={styles.textSignIn}
            onPress={() => navigation.navigate("SignIn")}
          >
            Entre
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
