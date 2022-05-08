const bcryptjs = require('bcryptjs');
const {response}= require('express');
const User = require('../models/user');

const login = async(req ,res =response) =>{
    const {email,password}= req.body;

    try {
        //
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg:'Usuario / Contraseña no son correctos - correo'
            });
        }
        
        if (!user.status) {
            return res.status(400).json({
                msg:'Usuario / Contraseña no son correctos - estado: false'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password) ;
        if (!validPassword) {
            return res.status(400).json({
                msg:'Usuario / Contraseña no son correctos - contraseña'
            });
        }

        res.json({
            msg:'login OK'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}