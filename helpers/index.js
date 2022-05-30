const createJWT= require('./createJWT');
const dbValidators =require('./db-validators');
const googleVerify =require('./google-verify');
const uploadFile =require('./upload-file');


module.exports={
    createJWT,
    dbValidators,
    googleVerify,
    uploadFile
}