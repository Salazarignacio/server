import { genSaltSync, hashSync, compareSync } from "bcrypt";

function createHash(pass) {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(pass, salt);
  return hashPassword;
}

function verifyHash(reqPass, dbPass) {
  const isValid = compareSync(reqPass, dbPass)
  return isValid;
}

export { createHash, verifyHash };
