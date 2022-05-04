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

const usersPut = async(req, res=response) => {
    const id = req.params.id;
    const {_id,password , google,email, ...rest } = req.body;

    if(password){
        const salt =bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id,rest);
    res.json({
        msg: 'put Api -controlador',
        user
    });
}

const usersPost = async (req, res=response) => {
    const {name,email, password, role}= req.body;
    const user = new User({name,email, password, role});

    //encriptar password
    const salt =bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    //guardar en DB
    await user.save();

    res.json({
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