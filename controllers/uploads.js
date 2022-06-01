const  path  = require("path");
const fs     =require('fs');
const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { upFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");
const { default: cluster } = require("cluster");

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

    if (model.img) {
        const pathImage = path.join(__dirname,'../uploads',collection,model.img);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }        
    }

    const name= await upFile(req.files,undefined,collection);
    model.img= name;

    await model.save();

    res.json(model)
}

const updateImageCloudinary = async(req, res =response) => {
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

    if (model.img) {
        const nameArr= model.img.split('/');
        const name   = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    model.img= secure_url;

    await model.save();

    res.json(model)
}


const showImage =  async(req, res =response) => {
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

    if (model.img) {
        const pathImage = path.join(__dirname,'../uploads',collection,model.img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }        
    }
    
    const pathImage = path.join(__dirname,'../assets/no-image.jpg');
    return res.sendFile(pathImage);
    
}

module.exports ={
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary
};