const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtsSchema = new Schema({
  name: { type: String, required: true },
  comuna: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model('District', districtsSchema);