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
            searchCategory(term,res)
        break;
        case 'product':
            searchProduct(term,res)
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

    const regex = new RegExp(term , 'i');

    const users = await User.find({
        $or : [{name: regex},{email: regex}],
        $and : [{status: true}]
    })
    res.json({users});
}

const searchProduct= async (term = '', res=response) =>{
    const isMongoID = ObjectId.isValid(term);
    if ( isMongoID) {
        const product =await Product.findById(term).populate('category', 'name')
        return res.json({
            results:(product) ? [product] : []
        })        
    }

    const regex = new RegExp(term , 'i');

    const products= await Product.find({name: regex,status: true})
                    .populate('category', 'name')
    res.json({products});
}

const searchCategory= async (term = '', res=response) =>{
    const isMongoID = ObjectId.isValid(term);
    if ( isMongoID) {
        const category =await Category.findById(term)
        return res.json({
            results:(category) ? [category] : []
        })        
    }

    const regex = new RegExp(term , 'i');

    const categories= await Category.find({name: regex,status: true})
    res.json({categories});
}

module.exports ={
    search,
    searchUser
};