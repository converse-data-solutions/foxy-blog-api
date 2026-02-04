import bcrypt from "bcryptjs";

export const hash = (val: string) => bcrypt.hash(val, process.env.SALT_ROUNDS as string);
export const compare = (val: string, hash: string) =>
  bcrypt.compare(val, hash);
