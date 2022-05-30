const { resolve } = require('path');
const path =require('path');
const { v4: uuidv4 } = require('uuid');

const upFile =(files, validExtensions = ['png','jpg','jpeg','gif'],folder='') =>{
    return new Promise((resolve,reject) =>{
        const {file} = files;
        const nameCut= file.name.split('.');
        const extension = nameCut[nameCut.length -1];

        if (!validExtensions.includes(extension)) {
            return reject(`La extension ${extension} no es peritida , ${validExtensions}`);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads/',folder, nameTemp);
    
        file.mv(uploadPath,(err) => {
        if (err) {
           reject(err);
        }
    
        resolve(nameTemp);
        });
    });
}

module.exports ={
    upFile
}