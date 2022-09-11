import React from 'react';
import { Link } from 'react-router-dom';

const ToDoItem = ({ todo, delete_todo }) => {
    return (
        <div class='user_item'>
            <div>
                {todo.project}
            </div>
            <div>
                {todo.text}
            </div>
            <div>
                {todo.user}
            </div>
            <div>
                {todo.data}
            </div>
            <div>
                <button onClick={() => delete_todo(todo.id)} type='button'>Delete ToDo</button>
            </div>
        </div>
    )
}

const ToDoList = ({ todos, delete_todo }) => {
    return (
        <div class='main'>
            <div class='user_headers'>
                <div>
                    Project
                </div>
                <div>
                    Text
                </div>
                <div>
                    User
                </div>
                <div>
                    Data
                </div>
                <div>
                </div>
            </div>
            <div class='user_list'>
                {todos.map((todo) => <ToDoItem todo={todo} delete_todo={delete_todo} />)}
            </div>
            <div>
                <Link to='/todo_create'>
                    <p class="nav-link" href="#">Create ToDo</p>
                </Link>
            </div>
        </div >
    )
}

export default ToDoList;