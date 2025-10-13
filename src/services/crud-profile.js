import { supabase } from "../config/supabaseConfig";

export default async function updateProfile(idUser, profileData) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', idUser)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error ao atualizar perfil:', error);
    return { data: null, error };
  }
}

export async function updateProfileWithPassword(idUser, profileData, newPassword) {
  try {
    const result = await updateProfile(idUser, profileData);

    let passwordError = null;
    if (newPassword) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) passwordError = error;
    }

    return { data: result.data, error: result.error, passwordError };
  } catch (error) {
    console.error('Error in updateProfileWithPassword:', error);
    return { data: null, error };
  }
}