require('dotenv').config();
const mongoose = require('mongoose');

async function database_conn(){
    const URI = process.env.MONGO_URI;
    try{
        if(!URI){
            throw new Error('MONGO_URI environment variable is not set.');
        }
        console.log("Connecting to database");
        await mongoose.connect(URI, {
            authSource: 'admin'
        });
        console.log('Connected to database');
        return mongoose.connection;

    } catch (dbConnError){
        console.error("Database connection error:", dbConnError);
        throw dbConnError; // Rethrow the error to handle it in the caller
    }
}

module.exports = database_conn;