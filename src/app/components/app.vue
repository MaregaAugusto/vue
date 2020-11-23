<template>
    <section >
        <!------------------------ 
            ENTRADA DE DATOS 
        ------------------------->
        <header>
            <h1 style="text-align:center" >TAREA</h1>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input">
                    </div>
                </div>
                <template v-if="editar === false">
                    <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="Nueva tarea" v-model="task.contenido" @keyup.enter="agregarTarea">
                </template>
                <template v-else>
                    <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="Nueva tarea" v-model="task.contenido" @keyup.enter="agregarTarea">
                </template>

            </div>
        </header>
        <!------------------------ 
            MOSTRAR  DATOS
        ------------------------->
        <section v-for="tarea of tasks">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input" @click="cambiarEstado(tarea)">
                    </div>
                </div>
                <p class="form-control" @dblclick="buscarTarea(tarea._id)">{{tarea.contenido}}</p>
                <div class="input-group-append">
                    <button type="button" class="btn btn-outline-secondary" aria-label="Close" @click="borrarTarea(tarea._id)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </section>
        <!------------------------ 
            SELECTOR DE DATOS 
        ------------------------->
        <footer>
            <ul class="nav nav-pills nav-justified">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Todos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Activos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Terminados</a>
                </li>
                <li class="nav-item">
                    <button @click="eliminar">Eliminar Todos</button>
                </li>
            </ul>
        </footer>
    </section>
    
</template>

<script>
class Task{
    constructor(contenido, estado){
        this.contenido=contenido;
        this.estado=estado;
    }
};

export default {
    data(){
        return{
            task: new Task(),
            tasks:[],
            editar: false,
            idEditando: "",
        }
    },
    created(){
        this.getTares()
    },
    methods:{
        agregarTarea(){
            this.task.estado = false;
            if (this.editar === false) {
                fetch('/api/tareas',{
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept':'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTares();
                });
                this.task= new Task()
            } else{
                fetch('/api/tareas/'+this.idEditando,{
                    method: 'PUT',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept':'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log("loco no andaaaaa")
                    this.editar=false;
                    this.getTares();
                });
                this.task= new Task()
            }
            
        },

        getTares(){
            fetch('/api/tareas',{})
            .then(res => res.json())
            .then(data => {
                this.tasks = data
                console.log(this.tasks)
            });
        },

        borrarTarea(id){
            fetch('/api/tareas/'+id,{
                method: 'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTares();
            });
        },

        buscarTarea(id){
            fetch('/api/tareas/'+id)
            .then(res => res.json())
            .then(data => {
                this.task = new Task(data.contenido, data.estado);
                console.log(data._id)
                this.idEditando = data._id;
                this.editar = true
            });
        },

        cambiarEstado(tarea){
            const tareaNew = new Task(tarea.contenido, true);
            console.log(tareaNew)
            fetch('/api/tareas/'+tarea.id,{
                    method: 'PUT',
                    body: JSON.stringify(tareaNew),
                    headers:{
                        'Accept':'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTares();
                });
        },

        eliminar(){
            fetch('/api/tareas',{
                    method: 'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTares();
                });
        }

    }
}
</script>
