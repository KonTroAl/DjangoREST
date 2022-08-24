import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class='menu' >
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <Link to='/'>
              {/* Project list */}
              <p class="navbar-brand">Home</p>
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link to='/users'>
                    <p class="nav-link active" aria-current="page" href="#">User List</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to='/todo'>
                    <p class="nav-link" href="#">ToDo List</p>
                  </Link>
                </li>
                <li class="nav-item">
                  {this.props.is_auth ? <button onClick={() => this.props.logout}> Logout </button> :
                    <Link to='/login'>
                      <p class="nav-link" href="#">Login</p>
                    </Link>
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

}

export default Menu;
