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
            />  
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
