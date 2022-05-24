const { Router }  = require('express');
const { check }  = require('express-validator');

const { createCategory, obtainCategory, obtainCategories, deleteCategory, updateCategory } = require('../controllers/createCategory');
const { existCAtegoryToId } = require('../helpers/db-validators');
const { validateFields, validateJWT} = require('../middlewares');

const router = Router();

router.get('/', obtainCategories);

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCAtegoryToId),
    validateFields
],obtainCategory);

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCAtegoryToId),
    validateFields
], updateCategory);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCAtegoryToId),
    validateFields
], deleteCategory);

module.exports= router;