const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;

        this.path= {
            auth :'/api/auth',
            users :'/api/users',
            categories:  '/api/categories',
            products: '/api/products',
            search:'/api/search'
        }
        //conecion a base de datos
        this.connectDB();

        //Middlewares
        this.middelwares();
        //Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middelwares(){
        this.app.use(cors());

        //Parsep y lectura del body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categories, require('../routes/categories'));
        this.app.use(this.path.products, require('../routes/products'));
        this.app.use(this.path.search, require('../routes/search'));
        this.app.use(this.path.users, require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Corriendo en el puerto:', this.port);
        });
    }
}

module.exports= Server;