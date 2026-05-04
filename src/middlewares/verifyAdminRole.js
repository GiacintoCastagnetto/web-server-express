const { response } = require("express");

const verifyAdminRole = async (req = request, res = response, next) => {
    console.log(req.activeUserRole);

    if(!req.activeUserRole){
        return res.status(401).json({
            msg: "Permiso denegado"
        });
    }

    if(req.activeUserRole !== "admin"){
        return res.status(403).json({
            msg: "Permiso denegado"
        });
    }
    
    next();
}

module.exports = {
    verifyAdminRole
}