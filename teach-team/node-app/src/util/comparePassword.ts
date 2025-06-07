const bcrypt = require("bcrypt");

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};
