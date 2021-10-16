const mongoose = require('mongoose');
const dotenv = require('dotenv');

const colors = require('colors');

dotenv.config();
const DB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(
      `Connection establish successfuly ${con.connection.host}`.brightCyan
        .underline
    );
  } catch (error) {
    console.log('Error: 💥', error.message.red.underline.bold);
    process.exit(1);
  }
};
module.exports = connectDB;
