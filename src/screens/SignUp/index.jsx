import React, { useEffect, useState } from "react";
import {
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
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../config/supabaseConfig";
import Toast from "react-native-toast-message";
import { loginCompletionCheck } from "../../services/login-completion-check";
import { formatEmail } from "../../services/format";

export default function SignUp({ navigation }) {
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (session && session.user) {
      const checkLoginCompletion = async () => {
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
      checkLoginCompletion();
    }
  }, [session]);

  async function signUpWithEmail() {
    setLoading(true);
    const cleanEmail = formatEmail(email);

    if (
      name === "" ||
      cleanEmail === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos!",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "As senhas não coincidem!",
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (signUpError) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: signUpError.message,
        });
        setLoading(false);
        return;
      }

      const uuid = data.user?.id;
      if (uuid) {
        const { error: insertError } = await supabase.from("profiles").insert({
          user_id: uuid,
          name,
          email: cleanEmail,
          type_user: typeUser,
          login_completed: typeUser === "client",
        });

        if (insertError) {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Erro ao salvar no banco.",
          });
          console.error("Insert error:", insertError);
          setLoading(false);
          return;
        }

        Toast.show({
          type: "success",
          text1: "Cadastro feito",
          text2: "Verifique seu e-mail para confirmar o login",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro inesperado",
        text2: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunity
            name="keyboard-backspace"
            size={30}
            color={"#fff"}
          />
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
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
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
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.5 }]}
              onPress={signUpWithEmail}
              disabled={loading}
            >
              <Text style={styles.textButton}>
                {loading ? "Carregando..." : "Entrar"}
              </Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
