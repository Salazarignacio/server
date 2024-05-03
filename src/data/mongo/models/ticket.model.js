import { Schema, model, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'tickets'

const schema = new Schema({
user_id: { type: Types.ObjectId, required: true, ref: 'users'},
product_id: { type: Types.ObjectId, required: true, ref: 'products'},
quantity: { type: Number, default: 1 },
})

/* localhost:8080/carts/:uid debe mostrar:
-todos los productos disponibles d un usuario
agregar un botón para eliminar el producto del carrito
agregar un input numérico para la gestión de la cantidad de unidades a comprar
agregar un botón para finalizar la compra y borrar todos los productos del carrito
agregar un botón para cancelar la compra y borrar todos los productos del carrito
 */

schema.pre('find', function (){
    this.populate('user_id', 'email')
})

schema.plugin(mongoosePaginate)
const Ticket = model(collection, schema)
export default Ticket