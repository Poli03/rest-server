const {response}= require('express');

const login = (req ,res =response) =>{
    res.json({
        msg:'login OK'
    });
}

module.exports = {
    login
}