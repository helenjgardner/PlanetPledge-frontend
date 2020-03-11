import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';

class Header extends React.Component {

  state = {
    isModalOpen: false
  }

  handleClick = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  render() {

    return (
      <div id='header'>
        <FontAwesomeIcon id="add-icon" icon={faPlusCircle} onClick={this.handleClick} />
        <Modal isOpen={this.state.isModalOpen} onClose={this.handleClick}>
            <div>I have made a modal!</div>
          </Modal>
        <h1>planet pledge</h1>
        <h2>saving the world, one plastic bottle at a time</h2>
        <p>Today is Friday 6th March 2020</p>
        <p>You have {this.props.pledgeCount} active pledges</p>
      </div>
    );
  }
}

export default Header;
