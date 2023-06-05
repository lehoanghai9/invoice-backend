const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    total: Number,
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  { _id: false }
);

const invoiceSchema = new Schema({
  id: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  paymentDue: { type: Date },
  description: String,
  paymentTerms: { type: Number, },
  clientName: { type: String, },
  clientEmail: { type: String, },
  status: { type: String, required: true },
  senderAddress: { type: addressSchema },
  clientAddress: { type: addressSchema },
  items: { type: [itemSchema] },
  total: { type: Number },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
