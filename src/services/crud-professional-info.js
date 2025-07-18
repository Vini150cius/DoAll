import { supabase } from "../config/supabaseConfig";

export async function updateProfessionalInfo(user_id, name, email, services, sentence, telefone, photo_url, service_type, type_user) {
  try {
    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({
        name,
        email,
        services,
        sentence,
        telefone,
        photo_url,
        service_type,
        type_user,
        login_completed: true,
      })
      .eq("user_id", user_id)
      .select();
    return { updateData, updateError }
  } catch (err) {
    console.error(err)
    return err;
  }
}