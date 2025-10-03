import Toast from "react-native-toast-message";
import { supabase } from "../config/supabaseConfig";

export async function createService(professional_id, client_id = null, description_service, name_client, phone_client, status_service = "pendente", price_service) {
  try {
    const { data, error: insertError } = await supabase.from("services").insert({
      professional_id,
      client_id,
      description_service,
      name_client,
      phone_client,
      status_service,
      price_service,
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
    console.log(service_id, professional_id, status_service)
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

export async function createService1(
  professional_id,
  client_id = null,
  description_service,
  name_client,
  phone_client,
  status_service = "aguardando",
  price_service,
  service_date
) {
  try {
    const { data, error: insertError } = await supabase
      .from("services")
      .insert({
        professional_id,
        client_id,
        description_service,
        name_client,
        phone_client,
        status: status_service,
        price: price_service,
        service_date,
      })
      .select();

    if (insertError) {
      Toast.show({
        type: "error",
        text1: "Erro ao inserir serviço",
        text2: insertError.message,
      });
      throw insertError;
    }

    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "Serviço criado com sucesso!",
    });

    return { data, insertError };
  } catch (err) {
    console.error("Erro ao criar serviço:", err);
    Toast.show({
      type: "error",
      text1: "Erro ao inserir serviço",
      text2: err.message || "Erro desconhecido",
    });
    return err.message;
  }
}
