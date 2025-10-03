import { supabase } from "../config/supabaseConfig";

export async function readServicesWithStatus(idUser, status = 'em_analise') {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        profiles!services_client_id_fkey (
          photo_url
        )
      `)
      .eq('status_service', status)
      .eq('professional_id', idUser)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao ler services:', error);
    return { data: null, error };
  }
}

export async function updateStatusOfService(serviceId, newStatus) {
  try {
    const { data, error } = await supabase
      .from('services')
      .update({ status_service: newStatus })
      .eq('id', serviceId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error ao atualizar status do service:', error);
    return { data: null, error };
  }
}