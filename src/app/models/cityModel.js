const mongoose = require('mongoose');

const { Schema } = mongoose;
const CitySchema = new Schema(
  {
    name: { type: String, required: true },
    state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
  },
  { timestamps: true },
  { strict: true }
);
CitySchema.index({ name: 1, state: 1 }, { unique: true });
module.exports = mongoose.model('City', CitySchema);
