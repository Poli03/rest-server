const { response } = require("express");
const { Category } = require('../models')


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

module.exports ={
    createCategory
};