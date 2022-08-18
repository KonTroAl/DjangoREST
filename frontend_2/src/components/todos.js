import React from 'react';

const ToDoItem = ({ todo }) => {
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

        </div >
    )
}

export default ToDoList;