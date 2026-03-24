const express = require("express");

class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.countriesPath = "/api/countries";
        this.usersPath = "/api/users";
        this.routes();
    }

    routes(){
        this.app.use(this.countriesPath, require("../routes/countries.routes"));
        this.app.use(this.usersPath, require("../routes/users.routes"));

        this.app.get("/", (req, res)=>{
            res.status(200).json({
                msg: "Hola mundo"
            });
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;