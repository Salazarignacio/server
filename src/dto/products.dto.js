import args from "../../utils/args.utils.js";
import crypto from "crypto";

const persistence = args.persistence;

class ProductsDTO {
  constructor(data) {
    persistence != "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.description = data.description;
    this.price = data.price || 1;
    this.stock = data.stock || 10;
    this.images = data.images || ["https://i.postimg.cc/kX8PKZpq/ipad.jpg"];
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDTO