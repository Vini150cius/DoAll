import { supabase } from "../config/supabaseConfig";

export async function getFavoritesByProfessionalId(profissional_id) {
  try {
    if (!profissional_id) {
      return { favorites: [], error: new Error("profissional_id is required") };
    }

    const { data: favorites, error } = await supabase
      .from("favoritos")
      .select("id, id_profissional, id_cliente, created_at")
      .eq("id_profissional", profissional_id);

    if (error) {
      console.error("Erro ao buscar favoritos:", error);
      return { favorites: null, error };
    }

    if (!favorites || favorites.length === 0) {
      return { favorites: [], error: null };
    }

    const enriched = await Promise.all(
      favorites.map(async (fav) => {
        try {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select(
              "user_id, name, email, photo_url, services, sentence, telefone, service_type"
            )
            .eq("user_id", fav.id_cliente)
            .single();

          if (profileError) {
            return { ...fav, profile: null };
          }

          return { ...fav, profile };
        } catch (err) {
          console.error("Erro ao buscar profile do cliente:", err);
          return { ...fav, profile: null };
        }
      })
    );

    return { favorites: enriched, error: null };
  } catch (catchError) {
    console.error(
      "Erro inesperado em getFavoritesByProfessionalId:",
      catchError
    );
    return { favorites: null, error: catchError };
  }
}

export default getFavoritesByProfessionalId;

export async function getFavoritesByClienteId(cliente_id) {
  try {
    if (!cliente_id) {
      return { favorites: [], error: new Error("cliente_id is required") };
    }

    const { data: favorites, error } = await supabase
      .from("favoritos")
      .select("id, id_profissional, id_cliente, created_at")
      .eq("id_cliente", cliente_id);

    if (error) {
      console.error("Erro ao buscar favoritos (cliente):", error);
      return { favorites: null, error };
    }

    if (!favorites || favorites.length === 0) {
      return { favorites: [], error: null };
    }

    const enriched = await Promise.all(
      favorites.map(async (fav) => {
        try {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select(
              "user_id, name, email, photo_url, services, sentence, telefone, service_type"
            )
            .eq("user_id", fav.id_profissional)
            .single();

          if (profileError) {
            return { ...fav, profile: null };
          }

          return { ...fav, profile };
        } catch (err) {
          console.error("Erro ao buscar profile do profissional:", err);
          return { ...fav, profile: null };
        }
      })
    );

    return { favorites: enriched, error: null };
  } catch (catchError) {
    console.error("Erro inesperado em getFavoritesByClienteId:", catchError);
    return { favorites: null, error: catchError };
  }
}
