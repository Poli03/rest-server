const {response, request} = require('express');
const bcryptjs= require('bcryptjs');

const User = require('../models/user');


const usersGet = async (req = request, res=response) => {
    const {limit=5, since= 0} = req.query;
    const query = {status: true};


    const [ total ,users ]= await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
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
    res.json(user);
}

const usersPost = async (req, res=response) => {
    const {name,email, password, role}= req.body;
    const user = new User({name,email, password, role});

    //encriptar password
    const salt =bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    //guardar en DB
    await user.save();

    res.json(user);
}

const usersPatch = (req, res=response) => {
    res.json({
        msg: 'patch Api -controlador'
    });
}

const usersDelete = async(req, res=response) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json(user);
}

module.exports= {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}