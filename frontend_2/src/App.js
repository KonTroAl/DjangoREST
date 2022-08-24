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
import Cookies from 'universal-cookie';

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

    logout() {
        this.set_token('')
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', { headers })
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({
            'token': token
        }, () => this.load_data())
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({
            'token': token
        }, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', { username: username, password: password })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
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
