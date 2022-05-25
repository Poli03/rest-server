const { response } = require("express");
const { Product, Category } = require('../models');

const obtainProducts = async(req , res = response) =>{
    const {limit=5, since= 0} = req.query;
    const query = {status: true};

    const [ total ,products ]= await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .skip(Number(since))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
};

const obtainProduct = async (req , res = response) =>{
    const id = req.params.id;

    const product = await Product.findById(id);
    res.json(product);
}; 

const createProduct = async (req , res = response)=>{
    const name = req.body.name.toUpperCase();
    const nameCategory= req.body.category.toUpperCase();

    const category = await Category.findOne({name: `${nameCategory}`});

    const productDB = await Product.findOne( {name} );

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${ productDB.name}, ya existe`
        });
    }

    const data = {
        name,
        category,
        user: req.user._id
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);
}

const updateProduct = async (req , res = response) =>{
    const id = req.params.id;
    
    const {_id, user, ...data} = req.body;
    
    data.name=data.name.toUpperCase();
    data.user= req.user._id;

    const product = await Product.findByIdAndUpdate(id,data,{new:true});
    
    res.json(product);
}; 

const deleteProduct = async (req , res = response) =>{
    const id = req.params.id;
  
    const product = await Product.findByIdAndUpdate(id,{status: false},{new:true});
    
    res.json(product);
}; 

module.exports ={
    obtainProducts,
    obtainProduct,
    createProduct,
    updateProduct,
    deleteProduct
};