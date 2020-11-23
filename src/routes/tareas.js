const express = require('express');
const router = express.Router();

const Tarea = require('..\\models\\Tarea');

router.get('/', async(req, res)=>{
    const tareas = await Tarea.find();
    res.json(tareas);
});

router.get('/:id', async(req, res)=>{
    const tareas = await Tarea.findById(req.params.id);
    res.json(tareas);
});

router.post('/', async(req, res)=>{
    const tarea = new Tarea (req.body);
    tarea.estado = false;
    await tarea.save();
    res.json({
        status: "tarea guardada"
    })
});

router.put('/:id', async(req, res)=>{
    await Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.json('actualizado');
});

router.delete('/:id', async(req, res)=>{
    await Tarea.findByIdAndRemove(req.params.id)
    res.json('eliminada');
});

router.delete('/', async(req, res)=>{
    await Tarea.deleteMany();
    res.json('eliminada');
});



module.exports=router;