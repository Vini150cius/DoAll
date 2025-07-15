import Toast from "react-native-toast-message";
import { supabase } from "../config/supabaseConfig";
import { GetUserInfo } from "./get-user-info";
import { idUser } from "../redux/User/slice";

export async function loginCompletionCheck(userId, dispatch, navigation, setLoading) {
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

    dispatch(idUser(userId));
    await GetUserInfo(userId, dispatch);
    navigation.navigate("DrawerApp");
  } else {

    Toast.show({
      type: "info",
      text1: "Complete seu cadastro",
      text2: "Redirecionando para o cadastro profissional.",
    });

    dispatch(idUser(userId));
    navigation.navigate("ProfessionalSignUp");
  }
  setLoading(false);
}