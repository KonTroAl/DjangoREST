// import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/users.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

    }

    render() {
        return (
            <Router>
                <div class='container wrapper'>
                    <div class='content'>
                        <Menu />
                        <Routes>
                            <Route path='users' element={<UserList users={this.state.users} />}>
                            </Route>
                        </Routes>
                        {/* <UserList users={this.state.users} /> */}
                    </div>
                    <Footer />
                </div>
            </Router>
        )
    }

}

export default App;
