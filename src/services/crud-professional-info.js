import { supabase } from "../config/supabaseConfig";

export async function readProfessionals() {
  try {
    const { data: dataFreelancers, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("type_user", "profissional")

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao visualizar profissionais",
        text2: error.message
      });
      throw error;
    }

    return { dataFreelancers, error: null };

  } catch (catchError) {
    console.error("Erro inesperado:", catchError);
    return { dataFreelancers: null, error: catchError };
  }
}

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