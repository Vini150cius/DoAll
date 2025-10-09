import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from "../../config/supabaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { idUser, login } from "../../redux/User/slice";
import { loginCompletionCheck } from "../../services/login-completion-check";
import { checkTypeUser } from "../../services/check-type-user";
import { logout } from "../../services/logout";
import { formatEmail } from "../../services/format";
import Toast from "react-native-toast-message";

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
      const checkLoginCompletionAndType = async () => {
        try {
          const typeCorrect = await checkTypeUser(session.user.id, typeUser);
          if (typeCorrect == false) {
            Alert.alert("Tipo de usuario incorreto");
            logout(dispatch);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Erro ao verificar tipo de usuário:", error);
          return;
        }
        try {
          await loginCompletionCheck(
            session.user.id,
            dispatch,
            navigation,
            setLoading
          );
        } catch (error) {
          console.error("Erro ao verificar login:", error);
          setLoading(false);
        }
      };

      checkLoginCompletionAndType();
    }
  }, [session]);

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

    const cleanEmail = formatEmail(email);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    if (authError) {
      Toast.show({
        type: "error",
        text1: "Erro ao entrar",
        text2:
          authError.message === "Invalid login credentials"
            ? "Email ou senha incorretos"
            : authError.message,
      });
      setLoading(false);
      return;
    }

    if (data && data.session && data.session.user && data.session.user.id) {
      dispatch(idUser(data.session.user.id));
      dispatch(login(typeUser));
      await checkLoginCompletionAndType();
    }
    setLoading(false);
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
          <MaterialCommunity name="keyboard-backspace" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.welcome}>Bem vindo</Text>
          <Text style={styles.typeUser}>
            {typeUser == "client" ? "Cliente" : "Profissional"}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
