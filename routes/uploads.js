const { Router }  = require('express');
const { check }  = require('express-validator');

const { uploadFile, updateImage } = require('../controllers/uploads');
const { validCollection } = require('../helpers');
const { validateFields, validateContent } = require('../middlewares');

const router = Router();

router.post('/',validateContent,uploadFile);

router.put('/:collection/:id',[
    validateContent,
    check('id','El id debde ser de mongoDB').isMongoId(),
    check('collection').custom(c => validCollection(c,['user','product'])),
    validateFields
],updateImage)

module.exports= router;