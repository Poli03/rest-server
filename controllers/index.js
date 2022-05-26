const products = require('../controllers/product');
const auth = require('../controllers/auth');
const category = require('../controllers/category');
const users = require('../controllers/users');
const search = require('../controllers/search')

module.exports= {
    ...products,
    ...auth,
    ...category,
    ...users,
    ...search
}