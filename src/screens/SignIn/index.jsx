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
import { supabase } from "../../config/supabaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { idUser, login } from "../../redux/User/slice";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../config/firebase";

export default function SignIn({ navigation }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  const dispatch = useDispatch();

  // const signIn = () => {
  //   if (email === "" || password === "") {
  //     setError("Preencha todos os campos");
  //     return;
  //   }

  //   const auth = getAuth(app);
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       dispatch(idUser(user.uid));
  //       dispatch(login(typeUser));
  //       navigation.navigate("DrawerApp");
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       Toast.show({
  //         type: "error",
  //         text1: "Erro ao entrar",
  //         text2: errorMessage,
  //       });
  //     });
  // };
  // Função para entrar no aplicativo pelo Firebase

  // Supabase - Função para ver se o usuário já está logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Função para entrar no aplicativo se já estiver logado
  useEffect(() => {
    if (session && session.user) {
      navigation.navigate("DrawerApp");
    }
  }, [session]);

  // Função para entrar no aplicativo pelo Supabase usando email e senha - tentei fazer pelo Google mas não consegui, sinto que aplicativos React Native é muito mais complicado que o web
  async function signInWithEmail() {
    setLoading(true);
    if (email === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Erro ao entrar",
        text2: "Preencha todos os campos",
      });
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Erro ao entrar",
        text2: "A senha deve ter pelo menos 6 caracteres",
      });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao entrar",
        text2: error.message,
      });
      return;
    }

    const user = data.user;

    dispatch(idUser(user.id));
    dispatch(login(typeUser));
    setLoading(false);
    navigation.navigate("DrawerApp");
  }

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
        <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Você ainda não tem uma conta?{" "}
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
