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
import { useSelector } from "react-redux";
import { typeUser } from "../../redux/User/slice";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const typeUser = useSelector((state) => state.userReducer.typeUser);


  const firebaseConfig = {
    apiKey: "AIzaSyBL9KoyoV-J0nKCH7gM9QICxAExFlh9OWM",
    authDomain: "doall-83ded.firebaseapp.com",
    projectId: "doall-83ded",
    storageBucket: "doall-83ded.firebasestorage.app",
    messagingSenderId: "910120304549",
    appId: "1:910120304549:web:7245488810c96846af324c",
    measurementId: "G-B388X7XZ68"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const signIn = () => {
    if (email === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    navigation.navigate("Home");
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
        <Text style={styles.textButton}>
          Não tem uma conta?{" "}
          <Text
            style={styles.textButton}
            onPress={() => {
              
              navigation.navigate("SignUp");
            }}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
