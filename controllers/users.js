const {response, request} = require('express')
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
    const body= req.body;
    const user = new User(body);

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