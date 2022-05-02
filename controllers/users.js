const {response} = require('express')

const usersGet = (req, res=response) => {
    res.json({
        msg: 'get Api -controlador'
    });
}

const usersPut = (req, res=response) => {
    res.json({
        msg: 'put Api -controlador'
    });
}

const usersPost = (req, res=response) => {
    res.json({
        msg: 'post Api -controlador'
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