const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '')=> {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }
}

const emailExist=  async(email = '') => {
    const existEmail= await User.findOne({email});
    if (existEmail) {
        throw new Error(`Ese correo: ${email} ya esta registrado`);
    }
 }

 const existUserToId=  async(id = '') => {
    const existId= await User.findById(id);
    if (!existId) {
        throw new Error(`Ese id: ${id} no esta registrado`);
    }
 }

module.exports ={
    isRoleValid,
    emailExist,
    existUserToId
}