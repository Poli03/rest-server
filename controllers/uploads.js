const path =require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");

const uploadFile = (req , res = response) =>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({msg:'No files were uploaded'});
      return;
    }
  
    const {file} = req.files;
    const nameCut= file.name.split('.');
    const extension = nameCut[nameCut.length -1];

    const validExtensions = ['png','jpg','jpeg','gif'];
    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            msg: `La extension ${extension} no es peritida , ${validExtensions}`
        });
    }

    const nameTemp = uuidv4() + '.' + extension;
    
    const uploadPath = path.join(__dirname,'../uploads/', nameTemp);
  
    file.mv(uploadPath,(err) => {
      if (err) {
        return res.status(500).json({err});
      }
  
      res.json({msg:'File uploaded to ' + uploadPath});
    });
};


module.exports ={
    uploadFile
};