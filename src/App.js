import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header.js';
import Pledge from './components/Pledge.js';
import Footer from './components/Footer.js';
import Modal from './components/Modal'


class App extends React.Component {
  state = {
    pledges: [],
    isModalOpen: false
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  componentDidMount() {
    axios.get('http://localhost:3002/pledges')
      .then(res => {
        this.setState({ pledges: res.data })
      })
      .catch(err => console.log(err))
  }

  pledgeCount = () => this.state.pledges.length;

  deletePledge = (pledge_id) => {
    axios.delete("http://localhost:3002/pledges/" + pledge_id)
      .then(res => {
        const currentPledges = this.state.pledges.filter(item => {
          return item.pledge_id !== pledge_id
        })
        this.setState({ pledges: currentPledges })
      })
      .catch(err => {
        console.log('error deleting pledge', err)
      })
  }

  render() {

    return (
      <div className='app'>
        <Header pledgeCount={this.pledgeCount()} showModal={this.toggleModal} />
        <div id="pledge-container">
          {this.state.pledges.map(pledge => {
            return <Pledge
              title={pledge.pledge_title}
              detail={pledge.pledge_detail}
              key={pledge.pledge_id}
              id={pledge.pledge_id}
              deleteFunc={this.deletePledge}
            />
          })}
        </div>


        {/* modal */}
        <div>
          <button onClick={this.toggleModal}>Open modal dialog</button>
          <Modal isOpen={this.state.isModalOpen} onClose={this.toggleModal}>
            <div>I have made a modal!</div>
          </Modal>
        </div>


        <Footer />
      </div>
    );
  }
}

export default App;
