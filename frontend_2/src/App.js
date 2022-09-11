// import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/users.js';
import ProjectList from './components/projects';
import ToDoList from './components/todos';
import Auth from './components/auth';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import ProjectCreate from './components/project_create';
import TodoCreate from './components/todo_create';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'auth_user': '',
            'version': 'v2.0'
        }
    }

    project_create(project_name, repo_link, users) {
        const headers = this.get_headers()
        const data = { project_name: project_name, repo_link: repo_link, users: users }
        axios.post('http://127.0.0.1:8000/api/projects/', data, { headers }).then(response => {
            this.load_data()
            alert('Success')
        }).catch(error => {
            console.log(error)
            this.setState({ 'projects': [] })
        })
    }

    todo_create(project, text) {
        const headers = this.get_headers()
        const data = { 'project': project, 'text': text, 'user': this.state.auth_user.id }
        axios.post('http://127.0.0.1:8000/api/todo/', data, { headers }).then(response => {
            this.load_data()
            alert('Success')
        }).catch(error => {
            console.log(error)
            this.setState({ 'todos': [] })
        })
    }

    project_delete(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers }).then(response => {
            this.load_data()
            alert('Success')
        }).catch(error => {
            console.log(error)
        })
    }


    todo_delete(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers }).then(response => {
            this.load_data()
            alert('Success')
        }).catch(error => {
            console.log(error)
        })
    }

    load_data() {
        const headers = this.get_headers()

        // get users
        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        // get projects 
        axios.get('http://127.0.0.1:8000/api/projects/', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        // get todos
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

    set_token(token, auth_user) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('auth_user', auth_user)
        this.setState({
            'token': token,
            'auth_user': auth_user
        }, () => this.load_data())
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const auth_user = cookies.get('auth_user')
        this.setState({
            'token': token,
            'auth_user': auth_user
        }, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', { username: username, password: password })
            .then(response => {
                for (let i = 0; i < this.state.users.length; i++) {
                    if (this.state.users[i].username === username) {
                        this.set_token(response.data['token'], this.state.users[i])
                    } return;
                }
            }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
            'Accept': `application/json; version=${this.state.version}`,
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    logout() {
        this.set_token('', '')
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <Router>
                <div class='container wrapper'>
                    <div class='content'>
                        <div class='headers'>
                            <Menu />
                            <div class='profile navbar navbar-expand-lg bg-light'>
                                <ul class='navbar-nav'>
                                    <li class='nav-item'>
                                        {this.is_auth() ?
                                            <button class="nav-link logout_button" onClick={() => this.logout()}>Logout</button>
                                            :
                                            <Link to='/login'>
                                                <p class="nav-link" href="#">Login</p>
                                            </Link>
                                        }
                                    </li>
                                    <li class='nav-item'>
                                        {this.is_auth ?
                                            <p>{this.state.auth_user.username}</p>
                                            :
                                            <p></p>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Routes>
                            <Route path='/' element={<ProjectList projects={this.state.projects} delete_project={(id) => this.project_delete(id)} />}>
                                <Route path=':id' element={<ProjectList projects={this.state.projects} />}>
                                </Route>
                            </Route>
                            <Route path='project_create' element={<ProjectCreate users={this.state.users}
                                project_create={(project_name, repo_link, users) => this.project_create(project_name, repo_link, users)} />}>
                            </Route>
                            <Route path='users' element={<UserList users={this.state.users} />}>
                            </Route>
                            <Route path='todo' element={<ToDoList todos={this.state.todos} delete_todo={(id) => this.todo_delete(id)} />}>
                            </Route>
                            <Route path='todo_create' element={<TodoCreate projects={this.state.projects}
                                todo_create={(project, text) => this.todo_create(project, text)} />}>
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
