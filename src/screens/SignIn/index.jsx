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
import Toast from "react-native-toast-message"; // Certifique-se de que esta importação está presente!
import { GetUserInfo } from "../../services/get-user-info";

export default function SignIn({ navigation }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  const dispatch = useDispatch();

  // Supabase - Função para ver se o usuário já está logado
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((err) => {});

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
      handleLoginCompletionCheck(session.user.id);
    }
  }, [session]);

  // Função para verificar login_completed e navegar
  async function handleLoginCompletionCheck(userId) {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("login_completed")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      Toast.show({
        type: "error",
        text1: "Erro ao verificar perfil",
        text2: profileError.message,
      });
      setLoading(false);
      return;
    }

    if (profileData && profileData.login_completed === true) {
      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso",
      });
      dispatch(idUser(session.user.id));
      const { data: userData } = GetUserInfo(session.user.id, dispatch)
      navigation.navigate("DrawerApp");
    } else {
      Toast.show({
        type: "info",
        text1: "Complete seu cadastro",
        text2: "Redirecionando para o cadastro profissional.",
      });
      dispatch(idUser(session.user.id));
      navigation.navigate("ProfessionalSignUp");
    }
    setLoading(false);
  }

  // Função para entrar no aplicativo pelo Supabase usando email e senha
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

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      Toast.show({
        type: "error",
        text1: "Erro ao entrar",
        text2: authError.message,
      });
      setLoading(false);
      return;
    }

    const user = data.user;

    dispatch(idUser(session.user.id));
    dispatch(login(typeUser));

    await handleLoginCompletionCheck(user.id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
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
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={signInWithEmail}
          disabled={loading}
        >
          <Text style={styles.textButton}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
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
