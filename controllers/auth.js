const bcryptjs = require('bcryptjs');
const {response}= require('express');
const { json } = require('express/lib/response');

const { createJWT } = require('../helpers/createJWT');
const { googleVerify } = require('../helpers/google-verify');
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

        const token = await createJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async(req, res=response) =>{
    const {id_token}= req.body;

    try {
        const googleUser = await googleVerify(id_token);
        console.log(googleUser);

        res.json({
            msg: 'Todo piola',
            id_token
        })   
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El token nose pude verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}