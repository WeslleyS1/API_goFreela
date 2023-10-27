const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = Promise;
module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((err: { message: any }) => console.log(err.message));
};
