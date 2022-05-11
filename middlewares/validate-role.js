const {response} = require('express');

const isAdminRole = (req, res =response ,next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Aun no se valida el token'
        })
    }
    
    const { role, name}= req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${name} no es administrador - No tiene permisos`
        });
    }
    next();
}

module.exports = {
    isAdminRole
}