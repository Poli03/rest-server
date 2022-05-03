const { Router }  = require('express');
const { check }  = require('express-validator');

const { usersGet, usersPost, usersDelete, usersPut, usersPatch } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/',usersGet );

router.put('/:id', usersPut);

router.post('/',
    [check('email','Esto no es correo valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser mayor a 6 caracteres').isLength({min:6}),
    check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateFields
],usersPost);

router.patch('/',usersPatch)

router.delete('/', usersDelete);

module.exports=router;

