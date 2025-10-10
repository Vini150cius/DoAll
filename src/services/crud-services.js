import Toast from "react-native-toast-message";
import { supabase } from "../config/supabaseConfig";

export async function createService(professional_id, client_id = null, description_service, name_client, phone_client, status_service = "pendente", price_service, service_date = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()) {
  try {
    if (client_id && phone_client) {
      try {
        const { data: updateNumberData, error: updateNumberError } = await supabase
          .from("profiles")
          .update({ telefone: phone_client })
          .eq("user_id", client_id)
          .select();
        if (updateNumberError) {
          Toast.show({
            type: "error",
            text1: "Erro ao atualizar o telefone do cliente",
            text2: updateNumberError.message
          });
          throw updateNumberError;
        }
      } catch (error) {
        console.error("Erro ao atualizar o telefone do cliente:", error);
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar o telefone do cliente",
          text2: error.message
        });
      }
    }

    const { data, error: insertError } = await supabase.from("services").insert({
      professional_id,
      client_id,
      description_service,
      name_client,
      phone_client,
      status_service,
      price_service,
      service_date,
    }).select();

    if (insertError) {
      Toast.show({
        type: "error",
        text1: "Erro ao inserir serviços",
        text2: insertError.message
      });
      throw insertError;
    }

    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "Serviço criado com sucesso!"
    });

    return { data, insertError };
  } catch (err) {
    console.error("Erro ao criar serviço:", err);
    Toast.show({
      type: "error",
      text1: "Erro ao inserir serviços",
      text2: err.message || "Erro desconhecido",
    });
    return err.message;
  }
}

export async function readServices(professional_id) {
  try {
    const { data, error: selectError } = await supabase
      .from("services")
      .select("*")
      .eq("professional_id", professional_id)
      .in("status_service", ['concluido', 'pendente', 'cancelado'])
      .order("created_at", { ascending: false });

    if (selectError) {
      Toast.show({
        type: "error",
        text1: "Erro ao ler serviços",
        text2: selectError.message
      });
      throw selectError;
    }
    return data;
  } catch (err) {
    console.error("Erro ao ler serviço:", err);
    Toast.show({
      type: "error",
      text1: "Erro ao ler serviços",
      text2: err.message || "Erro desconhecido",
    });
    return err.message;
  }
}

export async function updateServices(service_id, professional_id, status_service = "pendente") {
  try {
    const { data: updateData, error: updateError } = await supabase
      .from("services")
      .update({
        professional_id,
        status_service
      })
      .eq("id", service_id)
      .select();
    if (updateError) {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar serviços",
        text2: updateError.message
      });
      throw updateError;
    }
    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: `Serviço ${status_service} com sucesso!`,
    });
    return { updateData, updateError }
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Erro ao atualizar serviços",
      text2: err || "Erro desconhecido"
    });
  }
}

export async function readServicesDone(professional_id) {
  try {
    const { data, error: selectError } = await supabase
      .from("services")
      .select("*")
      .eq("professional_id", professional_id)
      .eq("status_service", 'concluido')
      .order("created_at", { ascending: false });

    if (selectError) {
      Toast.show({
        type: "error",
        text1: "Erro ao ler serviços concluídos",
        text2: selectError.message
      });
      throw selectError;
    }
    return data;
  } catch (err) {
    console.error("Erro ao ler serviços concluídos:", err);
    Toast.show({
      type: "error",
      text1: "Erro ao ler serviços concluídos",
      text2: err.message || "Erro desconhecido",
    });
    return err.message;
  }
}