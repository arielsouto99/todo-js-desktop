import { Todo } from './todo.class';
import { countTodo } from "../js/componentes";

export class TodoList {

    constructor() {
        this.cargarLocalStorage();
        this.countTodo();
    }
    
    nuevoTodo( todo ){
        this.todos.push( todo )
        this.guardarLocalStorage();
        this.countTodo();
    }



    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
        this.countTodo();
    }

    marcarCompletado( id ) {
        for( const todo of this.todos){
            if ( todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.countTodo();

                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }


    countTodo() {
        let pendientes = 0;
        let countBox = countTodo.firstElementChild;
        for (let todo of this.todos) {
            (!todo.completado === true) ? pendientes++ : null;
        }
        countBox.innerHTML = pendientes;
    }


    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos) );
    }

    cargarLocalStorage(){
        
        this.todos = (localStorage.getItem('todo')) 
                   ? JSON.parse( localStorage.getItem('todo') ) 
                   : [];

        this.todos = this.todos.map( Todo.fromJson );// obj => Todo.fromJson( obj )
    }

}