const { response } = require("express");
const { upFile } = require("../helpers/upload-file");

const uploadFile = async(req , res = response) =>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({msg:'No files were uploaded'});
      return;
    }
  
    const fullPath=await upFile(req.files);

    res.json({
        name:fullPath
    })
};


module.exports ={
    uploadFile
};