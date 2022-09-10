import React from "react";

class ProjectCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project_name': '',
            'repo_link': '',
            'users': []
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        console.log(users)
        this.setState({
            'users': users
        })
    }

    handleSubmit(event) {
        this.props.project_create(this.state.project_name, this.state.repo_link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project_name"></label>
                    <input type='text' name="project_name" placeholder="Project Name"
                        value={this.state.project_name}
                        onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="repo_link"></label>
                    <input type='text' name="repo_link" placeholder="Link"
                        value={this.state.repo_link}
                        onChange={(event) => this.handleChange(event)} />
                </div>
                <select name="users" multiple onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>
                <input type='submit' value='Save' />
            </form>
        )
    }
}

export default ProjectCreate;