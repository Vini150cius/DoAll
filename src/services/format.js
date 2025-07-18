export const formatPhone = (telefone) => {
  if (!telefone) return "";
  return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};

export function formatEmail(email) {
  if (!email) return "";
  // Foi dificil encontrar alguem que me desse isso sem eu precisar instalar ou usar uma api...
  return email.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
}