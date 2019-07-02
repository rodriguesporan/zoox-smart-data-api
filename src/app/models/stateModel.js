const mongoose = require('mongoose');

const { Schema } = mongoose;

const StateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uf: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
  {
    strict: true,
  }
);
module.exports = mongoose.model('State', StateSchema);
