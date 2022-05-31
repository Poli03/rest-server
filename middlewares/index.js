const  validateFields= require('../middlewares/validate-fields');
const  validateJWT   = require('../middlewares/validate-jwt');
const validateRoles  = require('../middlewares/validate-role');
const  validateContent = require('../middlewares/validate-file')
module.exports= {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateContent
}