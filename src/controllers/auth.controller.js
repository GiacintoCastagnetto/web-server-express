const {response, request} = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req = request, res = response)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            msg: "Datos invalidos"
        });
    }

    try{
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(401).json({
                msg: "Datos invalidos"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                msg: "Datos invalidos"
            });
        }

        jwt.sign({
                username,
                role: user.role
            }, 
            process.env.SECRET_KEY, {
                expiresIn: "10s"
            }, 
            (error, token) => {
                if(error){
                    console.log(error);
                    return res.status(500).json({
                        msg: "Error del servidor"
                    });
                }
                res.status(200).json({
                    msg: "Login exitoso",
                    token
                }); 
            }
        )

    } catch (error){
        res.status(500).json({
            msg: "Error del servidor"
        });
    }
    
}

const register = async (req = request, res = response)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            msg: "Datos invalidos"
        });
    }

    try{
        const user = await User.findOne({username: username});
        if(user){
            return res.status(400).json({
                msg: "Usuario ya existe"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();
        res.status(200).json({
            msg: "Registro exitoso"
        });
    } catch (error){
        return res.status(500).json({
            msg: "Error del servidor"
        });
    }
}

module.exports = {
    login,
    register
}

