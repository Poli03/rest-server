const { Router }  = require('express');
const { check }  = require('express-validator');
const { usersGet, usersPost, usersDelete, usersPut, usersPatch } = require('../controllers/users');

const router = Router();

router.get('/',usersGet );

router.put('/:id', usersPut);

router.post('/',
    [check('email','Esto no es correo valido').isEmail(),
],usersPost);

router.patch('/',usersPatch)

router.delete('/', usersDelete);

module.exports=router;

