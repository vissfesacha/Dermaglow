const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type:Number, required: true },
  quantity: { type: Number, required: true },
  unitaryUSDvalue: { type: Number, required: false },
  COPprice: { type: Number, required: false },
  unitaryCOPvalue: { type: Number, required: false },
  sellprice: { type: Number, required: false },
  profit: { type: Number, required: false },
  margen: { type: Number, required: false },
  
 
  
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Products', productSchema);

module.exports = Exercise;