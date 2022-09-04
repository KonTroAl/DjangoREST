import React from 'react';

const UserItem = ({ user }) => {
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
            {user.is_staff ?
                <div>
                    True
                </div>
                :
                <div>
                    False
                </div>
            }
            {user.is_superuser ?
                <div>
                    True
                </div>
                :
                <div>
                    False
                </div>
            }
        </div>
    )
}

const UserList = ({ users }) => {
    return (
        <div class='main'>
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
                <div>
                    Staff
                </div>
                <div>
                    SuperUser
                </div>
            </div>
            <div class='user_list'>
                {users.map((user) => <UserItem user={user} />)}
            </div>

        </div >
    )
}

export default UserList;