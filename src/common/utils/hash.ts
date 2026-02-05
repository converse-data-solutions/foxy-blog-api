import bcrypt from "bcryptjs";
export const hash = (val: string) => bcrypt.hash(val, Number(process.env.SALT_ROUNDS));
export const compare = (val: string, hash: string) =>
  bcrypt.compare(val, hash);
