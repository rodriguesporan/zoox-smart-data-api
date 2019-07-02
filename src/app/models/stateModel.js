const mongoose = require('mongoose');
const { Schema } = mongoose;

const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model('State', StateSchema);