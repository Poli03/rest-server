const { Router }  = require('express');
const { check }  = require('express-validator');

const { obtainProducts, obtainProduct,createProduct, updateProduct, deleteProduct } = require('../controllers');
const { existProductToId } = require('../helpers/db-validators');
const { validateFields, validateJWT, isAdminRole} = require('../middlewares');

const router = Router();

router.get('/', obtainProducts);

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProductToId)
],obtainProduct);

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    validateFields
], createProduct);

router.put('/:id',[
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProductToId),
    validateFields
], updateProduct);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existProductToId),
    validateFields
], deleteProduct);

module.exports= router;