const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('dotenv').config();

module.exports = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err: { message: any }) =>
            console.log('Unable to connect to MongoDB: ' + err.message)
        );
};
