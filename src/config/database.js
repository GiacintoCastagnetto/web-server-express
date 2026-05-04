const mongoose = require("mongoose");

const connectDB = async () => {
    const connstring = process.env.MONGO_STRING;
    const dbName = process.env.DB_NAME;

    mongoose.connect(connstring, {
        dbName: dbName
    }).then(() => {
        console.log("Conexion exitosa a la base de datos");
    }).catch((error) => {
        console.log("Error de conexion con la base de datos");
        console.log(error);
    })

    // try{
    //     await mongoose.connect(connstring, {
    //         dbName: dbName
    //     })
    // } catch(error){
    //     console.log("Error de conexion con la base de datos");
    //     console.log(error);
    // }
}

module.exports = connectDB;