const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const validateJWT = async(req = request, res =response, next)=>{
    const token = req.header('xtoken');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const user= await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existente'
            })
        }
        
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado: false'
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no validoo'
        })
    }
}
module.exports={
    validateJWT
}