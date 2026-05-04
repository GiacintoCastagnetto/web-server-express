const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.countriesPath = "/api/countries";
        this.usersPath = "/api/users";
        this.authPath = "/api/auth";
        
        this.middlewares();
        this.routes();
        connectDB();
    }

    routes(){
        this.app.use(this.countriesPath, require("../routes/countries.routes"));
        this.app.use(this.usersPath, require("../routes/users.routes"));
        this.app.use(this.authPath, require("../routes/auth.routes"));

        this.app.get("/", (req, res)=>{
            res.status(200).json({
                msg: "Hola mundo"
            });
        })
    }

    middlewares(){
        const corsOptions = {
            origin: process.env.FRONTENT_APP_URL
        }
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;