import React from 'react';

const UserItem = ({user}) => {
    return (
        <div class='user_item'>
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
        <div>
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
            <div class='user_list'>
                {users.map((user) => <UserItem user={user} class='user_list' />)}
            </div>
        </div>
    )
}

export default UserList;