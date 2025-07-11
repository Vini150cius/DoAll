export async function logout() {
  let response;
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    response = true
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erro ao sair do perfil",
      text2: error?.message || "Erro desconhecido",

    });
    response = false
  }
  return response
}