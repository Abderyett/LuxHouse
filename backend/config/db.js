const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const DB = process.env.MONGO_URI;

const connect = async () => {
  try {
    const con = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connection establish successfuly ${con.connection.host}`);
  } catch (error) {
    console.log('Error: 💥', error.message);
    process.exit(1);
  }
};
module.exports = connect;
