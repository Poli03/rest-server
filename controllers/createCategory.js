const { response } = require("express");
const { Category } = require('../models');

const obtainCategories = async(req , res = response) =>{
    const query = {status: true};

    const [ total ,categories ]= await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
    ]);

    res.json({
        total,
        categories
    });
};

const obtainCategory = async (req , res = response) =>{
    const id = req.params.id;

    const category = await Category.findById(id);
    res.json(category);
}; 

const createCategory = async (req , res = response)=>{
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne( {name} );

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name}, ya existe`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save();

    res.status(201).json(category);
}

const updateCategory = async (req , res = response) =>{
    const id = req.params.id;
    
    const {_id, user, ...rest} = req.body;

    const category = await Category.findByIdAndUpdate(id,rest);
    
    res.json(category);
}; 

const deleteCategory = async (req , res = response) =>{
    const id = req.params.id;
  
    const category = await Category.findByIdAndUpdate(id,{status: false});
    
    res.json(category);
}; 

module.exports ={
    obtainCategories,
    obtainCategory,
    createCategory,
    updateCategory,
    deleteCategory
};