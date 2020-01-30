import React from 'react';
import NavBar from './NavBar';
import H1 from '../H1';

function Header() {
  return (
    <div>
      <NavBar>
        <H1>Reddit Viewer</H1>
      </NavBar>
    </div>
  );
}

export default Header;
