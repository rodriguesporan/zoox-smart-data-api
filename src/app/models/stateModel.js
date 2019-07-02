const mongoose = require('Mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
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

module.exports = mongoose.model('State', stateSchema);