import args from "../../utils/args.utils.js";
import crypto from "crypto";
import { createHash } from "../../utils/hash.util.js";

const persistence = args.persistence;

class UsersDTO {
  constructor(data) {
    persistence != "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.age = data.age || 12;
    this.verify = false;
    this.verifyCode = crypto.randomBytes(12).toString("hex");
    this.photo =
      data.photo ||
      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg";
    persistence != "mongo" &&
      (this.createdAt = new Date())(persistence != "mongo") &&
      (this.updatedAt = new Date());
  }
}

export default UsersDTO;
