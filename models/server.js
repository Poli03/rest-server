const express = require('express')

class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        
        //Middlewares
        this.middelwares();
        //Routes
        this.routes();
    }

    middelwares(){
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/hello', (req, res) => {
            res.json({
                msg: 'get Api'
            });
        });

        this.app.put('/hello', (req, res) => {
            res.json({
                msg: 'put Api'
            });
        });

        this.app.post('/hello', (req, res) => {
            res.json({
                msg: 'post Api'
            });
        });

        this.app.delete('/hello', (req, res) => {
            res.json({
                msg: 'delete Api'
            });
        });
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Corriendo en el puerto:', this.port);
        });
    }
}

module.exports= Server;