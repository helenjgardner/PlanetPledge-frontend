import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header.js';
import Pledge from './components/Pledge.js';
import Footer from './components/Footer.js';

class App extends React.Component {
  state = {
    pledges: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/pledges')

      .then(res => {
        this.setState({ pledges: res.data })
      })
      .catch(err => console.log(err))
  }

  deletePledge = (pledge_id) => {
    axios.delete("http://localhost:3001/pledges/" + pledge_id)
      .then(res => {
        const currentPledges = this.state.pledges.filter(item => {
          return item.pledge_id !== pledge_id})
        this.setState({ pledges: currentPledges })
      })
      .catch(err => {
        console.log('error deleting pledge', err)
      })
  }


  render() {

    // console.log(this.state.pledges)
    // const pledgeTitles = this.state.pledges.map(pledge => {
    // })



    return (
      <div className='app'>
        <Header />
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
        <Footer />
      </div>
    );
  }
}

export default App;
