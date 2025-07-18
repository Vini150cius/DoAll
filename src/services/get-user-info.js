import { supabase } from "../config/supabaseConfig";
import { data } from "../redux/User/slice";

export async function GetUserInfo(userId, dispatch) {
  try {
    const { data: userData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Erro ao buscar dados:", error);
      return null;
    }

    dispatch(data(userData));

    return userData;
  } catch (err) {
    console.error(err);
    return null;
  }
}