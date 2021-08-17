const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
  name: String,
  subregion: String,
  flag: String,
});

const Countries = mongoose.model('Country', countriesSchema);

module.exports = Countries;
