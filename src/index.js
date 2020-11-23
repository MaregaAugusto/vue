const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/tareasDB')
    .then(db => console.log("BD conectada"))
    .catch(err => console.log(err));
//Settings
app.set('port', process.env.PORT || 3000);// puerto del servidor

//Middlewares 
app.use(morgan('dev'));// mas informacion del server 
app.use(express.json());//transforma lo que recive a json

//Routes
app.use('/api/tareas', require('.\\routes\\tareas'));// archivo con las rutas 

//Static files

app.use(express.static(__dirname+'\\public'));

// Server is listening
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});