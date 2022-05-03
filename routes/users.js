const { Router }  = require('express');
const { check }  = require('express-validator');

const { usersGet, usersPost, usersDelete, usersPut, usersPatch } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const Role = require('../models/role');

const router = Router();

router.get('/',usersGet );

router.put('/:id', usersPut);

router.post('/',
    [check('email','Esto no es correo valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser mayor a 6 caracteres').isLength({min:6}),
    check('role').custom( async(role = '')=> {
        const existRole = await Role.findOne({role});
        if(!existRole){
            throw new Error(`El rol ${role} no existe en la base de datos`)
        }
    }),
    validateFields
],usersPost);

router.patch('/',usersPatch)

router.delete('/', usersDelete);

module.exports=router;

