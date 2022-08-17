import React from 'react';

const ProjectItem = ({ project }) => {
    return (
        <div class='user_item'>
            <div>
                {project.project_name}
            </div>
            <div>
                {project.repo_link}
            </div>
            <div>
                {project.users}
            </div>
        </div>
    )
}

const ProjectList = ({ projects }) => {
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
            </div>
            <div class='user_list'>
                {projects.map((project) => <ProjectItem project={project} />)}
            </div>

        </div >
    )
}

export default ProjectList;