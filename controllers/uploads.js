const { response } = require("express");
const { upFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const uploadFile = async(req , res = response) =>{
    try {
        const fullPath=await upFile(req.files,['txt','md'],'text');
        res.json({fullPath})
    } catch (error) {
        res.status(400).json({error});
    }
}

const updateImage = async(req, res =response) => {
    const {collection, id} =req.params;

    let model;

    switch (collection) {
        case 'user':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg:`No eciste un usuario con el id ${id}`
                });
            }
            break;
            case 'product':
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg:`No eciste un producto con el id ${id}`
                    });
                }
                break;
        default:
            return res.status(500).json({msg:'Respuesta aun no implementada'});
    }

    const name= await upFile(req.files,undefined,collection);
    model.img= name;

    await model.save();

    res.json(model)
}

module.exports ={
    uploadFile,
    updateImage
};