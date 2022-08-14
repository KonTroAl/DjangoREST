import React from 'react';

const Menu = () => {
    return (
        <div class='menu'>
            <nav class="navbar navbar-expand-lg bg-light">
              <div class="container-fluid">
                <p class="navbar-brand">Menu</p>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Profile</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Tasks</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>
    )
}

export default Menu;