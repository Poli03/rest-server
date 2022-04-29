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
            res.send('hello world');
          })
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Corriendo en el puerto:', this.port);
        });
    }
}

module.exports= Server;