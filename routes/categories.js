const { Router }  = require('express');
const { check }  = require('express-validator');

const { createCategory } = require('../controllers/createCategory');
const { validateFields, validateJWT} = require('../middlewares');

const router = Router();

router.get('/', (req, res)=> {
    res.json(' get')
});

router.get('/:id', (req, res)=> {
    res.json(' get - id')
});

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id', (req, res)=> {
    res.json(' put')
});

router.delete('/:id', (req, res)=> {
    res.json(' delete')
});

module.exports= router;