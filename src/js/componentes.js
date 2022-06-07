// Referencias en el HTML

import { Todo } from "../classes";
import { todoList } from "../index.js";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const countTodo = document.querySelector('.todo-count'); 

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed':'' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' :  '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos

// keyup --> cuando suelte la tecla, keycode = 13 --> Hace referencia la enter
txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ){

        const nuevoTodo = new Todo( txtInput.value ); // el valor de ese txtInput
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }

})

divTodoList.addEventListener('click', ( event ) => {
    // event.target --> muestra donde hace click el evento, button,label,input,etc en formato html
    // event.target.localName --> muestra donde hace click el evento, button,label,input,etc en crudo
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement; // El elemento padre del elemento padre para saber donde se encuentra
    const todoId = todoElemento.getAttribute('data-id'); // getAttribute permite recuperar el atributo del html
    
    // Si el nombreElemento incluye un input
    if ( nombreElemento.includes('input') ) { 
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    }else if( nombreElemento.includes('button') ){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento ); // Removiendo elemento
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length -1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
})

ulFiltros.addEventListener('click', ( event ) => {
    const filtro = event.target.text; // Devuelve lo que dice el texto, si es un espacio vacio devuelve 'undefined'

    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes': 
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados': 
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }

    }
})