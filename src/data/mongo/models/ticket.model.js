import { Schema, model, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'tickets'

const schema = new Schema({
user_id: { type: Types.ObjectId, required: true, ref: 'users'},
product_id: { type: Types.ObjectId, required: true, ref: 'products'},
quantity: { type: Number, default: 1 },
})

schema.pre('find', function (){
    this.populate('user_id', 'email')
})
schema.pre('find', function (){
    this.populate('product_id', 'title')
})

schema.plugin(mongoosePaginate)
const Ticket = model(collection, schema)
export default Ticket