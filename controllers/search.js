const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Category, Product,User } = require('../models');


const permittedCollections=[
    'category',
    'product',
    'role',
    'user',
];

const search = (req , res = response) =>{
    const {collection,term}=req.params;
    if(!permittedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${permittedCollections}`
        });
    }
    
    switch (collection) {
        case 'category':
        break;
        case 'product':
        break;
        case 'user':
            searchUser(term,res);
        break;
        default:
        return  res.status(500).json({
                msg: 'Busqueda aun no implementada'
            })
    }
}; 

const searchUser= async (term = '', res=response) =>{
    const isMongoID = ObjectId.isValid(term);
    if ( isMongoID) {
        const user =await User.findById(term)
        return res.json({
            results:(user) ? [user] : []
        })        
    }
}

module.exports ={
    search,
    searchUser
};