import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  render() {
    
    return (
      <div id='header'>
        <FontAwesomeIcon id="add-icon" icon={faPlusCircle} onClick={this.handleClickDel} />
        <h1>planet pledge</h1>
        <h2>saving the world, one plastic bottle at a time</h2>
        <p>Today is Friday 6th March 2020</p>
        <p>You have 4 active pledges and 2 inactive pledges</p>

      </div>
    );
  }
}

export default Header;
