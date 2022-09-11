import React from "react";

class ProjectFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project_name': '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.project_name)
    }


    handleSubmit(event) {
        this.props.filter_project(this.state.project_name)
        event.preventDefault()
    }

    render() {
        return (
            <form class="d-flex" role="search" onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <label htmlFor="project_name"></label>
                    <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" name='project_name'
                        value={this.state.project_name}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        )
    }
}

export default ProjectFilter;