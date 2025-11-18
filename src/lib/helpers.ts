export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  if (!phone || phone.trim().length === 0) {
    return false;
  }
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  const regex = /^(\+91)?[6-9]\d{9}$/;
  return regex.test(cleanPhone);
};

export const validatePostalCode = (zipCode: string) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(zipCode);
};

export const extractNumericOnly = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};

export const isValidPhoneInput = (value: string): boolean => {
  return /^[\d\s\-+()]*$/.test(value);
};
