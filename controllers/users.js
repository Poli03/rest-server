const {response, request} = require('express')

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

const usersPost = (req, res=response) => {
    const {name, age } = req.body;

    res.json({
        msg: 'post Api -controlador',
        name,
        age
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