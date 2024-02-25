const mongoose = require('mongoose');

async function ConnectMongoDB() {
    // MongoDB 연결
    try {
    mongoose.connect('mongodb+srv://yofp1937:1q2w3e4r@study.k9utdkl.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('MongoDB Connected!'))
        .catch(err => console.log(err));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = ConnectMongoDB;