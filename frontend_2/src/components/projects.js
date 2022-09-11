import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ProjectItem = ({ project, delete_project }) => {
    return (
        <div class='user_item'>
            <div>
                <Link to={`/${project.id}`}>
                    {project.project_name}
                </Link>
            </div>
            <div>
                {project.repo_link}
            </div>
            <div>
                {project.users}
            </div>
            <div>
                <button onClick={() => delete_project(project.id)} type='button'>Delete Project</button>
            </div>
        </div >
    )
}

const ProjectList = ({ projects, delete_project }) => {
    let { id } = useParams();
    let filtered_items = projects.filter((item) => item.id === id)
    let project_items = projects
    if (filtered_items.length !== 0) {
        project_items = filtered_items
    }
    return (
        <div class='main'>
            <div class='user_headers'>
                <div>
                    Project Name
                </div>
                <div>
                    Repo Link
                </div>
                <div>
                    Users
                </div>
                <div>
                </div>
            </div>
            <div class='user_list'>
                {project_items.map((project) => <ProjectItem project={project} delete_project={delete_project} />)}
            </div>
            <div>
                <Link to='/project_create'>
                    <p class="nav-link" href="#">Create Project</p>
                </Link>
            </div>
        </div >
    )
}

export default ProjectList;