import React from "react";

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(this.state.username + ' ' + this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputEmail3" placeholder="username" name="username"
                            value={this.state.username}
                            onChange={(event) => this.handleChange(event)}>

                        </input>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword3" placeholder="password" name="password"
                            value={this.state.password}
                            onChange={(event) => this.handleChange(event)}></input>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" value="Login"> Sign in</button>
            </form >
        )

    }
}

export default Auth;