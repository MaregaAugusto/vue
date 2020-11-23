const mongoose = require('mongoose');
const {Schema} = mongoose;

const Tarea = new Schema({
    contenido: String,
    estado: Boolean,
});


module.exports=mongoose.model('Tarea', Tarea);

