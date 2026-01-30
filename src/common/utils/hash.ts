import bcrypt from "bcryptjs";

export const hash = (val: string) => bcrypt.hash(val, 10);
export const compare = (val: string, hash: string) =>
  bcrypt.compare(val, hash);
