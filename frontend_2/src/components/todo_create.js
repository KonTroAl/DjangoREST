import React from "react";

class TodoCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project': '',
            'text': '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'project': ''
            })
            return;
        }
        let project = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'project': project[0]
        })
    }

    handleSubmit(event) {
        this.props.todo_create(this.state.project, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input name="text" placeholder="text"
                        value={this.state.repo_link}
                        onChange={(event) => this.handleChange(event)} />
                </div>
                <select name="project" onChange={(event) => this.handleProjectChange(event)}>
                    <option></option>
                    {this.props.projects.map((item) => <option value={item.id}>{item.project_name}</option>)}
                </select>
                <input type='submit' value='Save' />
            </form>
        )
    }
}

export default TodoCreate;