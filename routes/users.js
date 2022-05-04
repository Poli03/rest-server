const { Router }  = require('express');
const { check }  = require('express-validator');

const { usersGet, usersPost, usersDelete, usersPut, usersPatch } = require('../controllers/users');
const { isRoleValid, emailExist, existUserToId } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/',usersGet );

router.post('/',
    [    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser mayor a 6 caracteres').isLength({min:6}),
    check('email','Esto no es correo valido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(isRoleValid),
    validateFields
],usersPost);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserToId),
    check('role').custom(isRoleValid),
    validateFields
], usersPut);

router.patch('/',usersPatch)

router.delete('/', usersDelete);

module.exports=router;

