import { supabase } from "../config/supabaseConfig";

export async function GetFreelancers(feed) {
  try {
    const { data: dataFreelancers, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("type_user", "profissional")

    if (error) {
      console.error("Erro ao buscar dados:", error);
      return { dataFreelancers: null, error };
    }

    return { dataFreelancers, error: null };
    
  } catch (catchError) {
    console.error("Erro inesperado:", catchError);
    return { dataFreelancers: null, error: catchError };
  }
}