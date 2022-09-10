import React from 'react';
import { Link } from 'react-router-dom';

const ToDoItem = ({ todo }) => {
    return (
        <div class='user_item'>
            <div>
                {todo.project.project_name}
            </div>
            <div>
                {todo.text}
            </div>
            <div>
                {todo.user.username}
            </div>
            <div>
                {todo.data}
            </div>
        </div>
    )
}

const ToDoList = ({ todos }) => {
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
            </div>
            <div class='user_list'>
                {todos.map((todo) => <ToDoItem todo={todo} />)}
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