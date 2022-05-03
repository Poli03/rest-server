const Role = require('../models/role');

const isRoleValid = async(role = '')=> {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }
}

module.exports ={
    isRoleValid
}