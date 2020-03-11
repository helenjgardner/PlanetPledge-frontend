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
    axios.get('http://localhost:3002/pledges')
      .then(res => {
        this.setState({ pledges: res.data })
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:3002/pledges_status')
      .then(res => {
        console.log(res.data)

        // create empty results array
        // loop through array and get pledge_id and date[8][9]
        // add to obj  ->  {pledge_id: 30, date: 05}
        // push obj to results array



        // this.generateDailyStatusArray()
        // this.setState({ pledges: res.data })
      })
      .catch(err => console.log(err))
  }

  pledgeCount = () => this.state.pledges.length;

  addPledge = (newPledgeTitle, newPledgeDetail) => {
    const newPledge = {
      "pledge_title": newPledgeTitle,
      "pledge_detail": newPledgeDetail,
      "pledge_type": "D",
      "username": "HelenG"
    }
    axios.post('http://localhost:3002/pledges', newPledge)
      .then(res => {
        newPledge.pledge_id = res.data.pledge_id;
        const pledgeCopy = this.state.pledges.slice();
        pledgeCopy.push(newPledge);
        this.setState({
          pledges: pledgeCopy
        })
      })
      .catch(err => console.log(err))
  }

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
        <Header
          pledgeCount={this.pledgeCount()}
          showModal={this.toggleModal}
          addPledgeFunc={this.addPledge}
        />
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
