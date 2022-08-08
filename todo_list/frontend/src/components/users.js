import React from 'react';

const UserItem = ({user}) => {
    return (
        <div class='user_list'>
            <div>
                {user.username}
            </div>
            <div>
                {user.first_name}
            </div>
            <div>
                {user.last_name}
            </div>
            <div>
                {user.email}
            </div>
          </div>
    )
}

const UserList = ({users}) => {
    return (
        <div class='container'>
            <div class='user_headers'>
                <div>
                    Username
                </div>
                <div>
                    First name
                </div>
                <div>
                    Last name
                </div>
                <div>
                    Email
                </div>
            </div>
            {users.map((user) => <UserItem user={user} />)}
        </div>
    )
}

export default UserList;