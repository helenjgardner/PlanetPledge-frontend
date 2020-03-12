import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header.js';
import Pledge from './components/Pledge.js';
import Footer from './components/Footer.js';

class App extends React.Component {
  state = {
    pledges: [],
    tempPledge: []
  }
  componentDidMount() {
    axios.get('http://localhost:3002/pledges')
      .then(res => {
        this.setState({ tempPledge: res.data })
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:3002/pledges_status')
      .then(res => {
        const data = res.data;
        let defaultObj = {
          pledge_id: null,
          "14": false,
          "15": false,
          "16": false,
          "17": false,
          "18": false,
          "19": false,
          "20": false,
        };
        let resultsArr = [];
        let currObj = Object.assign({}, defaultObj)
        currObj.pledge_id = data[0].pledge_id
        for (let i = 0; i < data.length; i++) {
          if (data[i].pledge_id === currObj.pledge_id) {
            const day = data[i].pledge_date.slice(8, 10)
            currObj[day] = true
          } else {
            resultsArr.push(currObj)
            currObj = Object.assign({}, defaultObj)
            currObj.pledge_id = data[i].pledge_id
            const day = data[i].pledge_date.slice(8, 10)
            currObj[day] = true
          }
          if (i === data.length - 1) {
            resultsArr.push(currObj)
          }
        }
        // console.log(Object.values(resultsArr[0]));
        // console.log(Object.keys(resultsArr[0]));




        console.log("original resultsArr", resultsArr)

        // get todays date and extract the day (11)
        // let today = new Date().getDate()
        let today=20;
        console.log(today)
        // create weekToDisplay empty array
        let weekToDisplay = [];
        // for each object on the resultsArr look for a key = 11
        resultsArr.map(p => {
          let insideArr = []
          insideArr.push(p.pledge_id)
          // console.log(p)
          let compareDate = today;
          for (let l = 0; l < 7; l++) {
            compareDate = (today - l).toString();
            if (p[compareDate]) {
              insideArr.push(true)
            } else {
              insideArr.push(false)
            }
          }
          weekToDisplay.push(insideArr)

        })
        // console.log(weekToDisplay)
        // if found we push true to weekToDisplay [ true ]
        // else if not found push false



        // console.log(Object.entries(resultsArr));
        // const result = resultsArr.map(el => Object.entries(el)).sort((a,b) => a[0] - b[0])
        // console.log(result)

        const allPledges = this.state.tempPledge;
        for (let j = 0; j < allPledges.length; j++) {
          for (let k = 0; k < weekToDisplay.length; k++) {
            let pID = weekToDisplay[k][0];
            let origPD = allPledges[j].pledge_id;
            if (pID === origPD) {
              allPledges[j].daily_status = weekToDisplay[k].slice(1)
            }
          }
        }
        console.log(allPledges)
        this.setState({
          pledges: allPledges
        })
        //  {10: true, 11: true, pledge_id: 34, 05: true, 06: true, 07: true, 08: true, …}
        // this.setState({ pledge_status: resultsArr })
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
              dailyStatus={pledge.daily_status}
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
