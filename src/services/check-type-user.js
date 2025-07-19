import { supabase } from "../config/supabaseConfig";

export async function checkTypeUser(idUser, type) {
  const { data: userData, error } = await supabase
    .from("profiles")
    .select("type_user")
    .eq("user_id", idUser)
    .single();
  if (userData) {
    if (userData.type_user === type) {
      return true;
    } else {
      return false;
    }
  }
  else {
    return false;
  }
}