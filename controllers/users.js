const {response, request} = require('express');
const bcryptjs= require('bcryptjs');

const User = require('../models/user');


const usersGet = (req = request, res=response) => {
    const {name = 'No name', apikey} = req.query;
    res.json({
        msg: 'get Api -controlador',
        name,
        apikey
    });
}

const usersPut = (req, res=response) => {
    const id = req.params.id; 
    res.json({
        msg: 'put Api -controlador',
        id
    });
}

const usersPost = async (req, res=response) => {
    const {name,email, password, role}= req.body;
    const user = new User({name,email, password, role});

    //verifiva si el correo ecsite
    const existEmail= await User.findOne({email});
    if (existEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        })
    }

    //encriptar password
    const salt =bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    //guardar en DB
    await user.save();

    res.json({
        msg: 'post Api -controlador',
        user
    });
}

const usersPatch = (req, res=response) => {
    res.json({
        msg: 'patch Api -controlador'
    });
}

const usersDelete = (req, res=response) => {
    res.json({
        msg: 'delete Api -controlador'
    });
}

module.exports= {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}