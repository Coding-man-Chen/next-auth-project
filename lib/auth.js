import { hash,compare } from "bcryptjs";
export const hashPassword = async (passowrd) => {
  const hashedPassword = await hash(passowrd, 12);
  return hashedPassword;
};

export const vertifyPassword = async (password,hashedPassword) => {
  const isValid = await compare(password,hashedPassword)
  return isValid
}
