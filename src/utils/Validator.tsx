export function validateEmail(email: string) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regex.test(email.toLowerCase());
}

export function validatePassword(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/;
  return regex.test(password);
}

export function validatePhoneNo(num: any) {
  const regex = /^\d{10}$/;
  return regex.test(num);
}

export const validateName = (name: string) => {
  const nameRegex = /^[a-zA-Z'\-]+$/;
  return nameRegex.test(name);
};
