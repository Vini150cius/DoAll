export const formatPhone = (telefone) => {
  if (telefone === null || telefone === undefined) return "";

  const digits = String(telefone).replace(/\D/g, "");

  if (digits.length === 0) return "";

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export function formatEmail(email) {
  if (!email) return "";
  // Foi dificil encontrar alguem que me desse isso sem eu precisar instalar ou usar uma api...
  return email.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
}

export function formatOnlyNumbers(number) {
  if (!number) return "";
  return parseFloat(
    number.trim().replace(",", ".").replace(/[^0-9.]/g, "")
  );
}