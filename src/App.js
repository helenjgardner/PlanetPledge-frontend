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
  }

  pledgeCount = () => this.state.pledges.length;

  deletePledge = (pledge_id) => {
    axios.delete("http://localhost:3002/pledges/" + pledge_id)
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

    return (
      <div className='app'>
        <Header pledgeCount={this.pledgeCount()} />
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






<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>





        <Footer />
      </div>
    );
  }
}

export default App;
