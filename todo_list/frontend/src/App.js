//import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './components/users.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        const users = [
            {
                'username': 'KonTroAl',
                'first_name': 'Konstantin',
                'last_name': 'Troshenkin',
                'email': 'kostya98295@mail.ru'
            }
        ]
        this.setState(
            {
                'users': users
            }
        )
    }

    render () {
        return (
            <div class='container'>
                <UserList users={this.state.users} />
            </div>
        )
    }

}

export default App;
