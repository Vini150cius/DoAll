import { supabase } from "../config/supabaseConfig";
import { logout as reduxLogout } from "../redux/User/slice";

export async function logout(dispatch) {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    dispatch(reduxLogout());

    return true
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erro ao sair do perfil",
      text2: error?.message || "Erro desconhecido",

    });
    return false
  }
}