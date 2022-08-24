// import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/users.js';
import ProjectList from './components/projects';
import ToDoList from './components/todos';
import Auth from './components/auth';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    load() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', { username: username, password: password })
            .then(response => {
                console.log(response.data)
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <Router>
                <div class='container wrapper'>
                    <div class='content'>
                        <Menu />
                        <Routes>
                            <Route path='/' element={<ProjectList projects={this.state.projects} />}>
                                <Route path=':id' element={<ProjectList projects={this.state.projects} />}>
                                </Route>
                            </Route>
                            <Route path='users' element={<UserList users={this.state.users} />}>
                            </Route>
                            <Route path='todo' element={<ToDoList todos={this.state.todos} />}>
                            </Route>
                            <Route path='login' element={<Auth get_token={(username, password) => this.get_token(username, password)} />}></Route>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        )
    }

}

export default App;
