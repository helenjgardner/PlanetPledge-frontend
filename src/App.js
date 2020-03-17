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
    // get all pledges out of pledges table and put in temporary state
    // this is because we couldnt work out how to update state twice 
    // gets pledge_id, title, details per pledge
    axios.get('http://localhost:3002/pledges')
      .then(res => {
        this.setState({ tempPledge: res.data })
      })
      .catch(err => console.log(err))
    // second call to get data out of pledge_status table
    // table joins on pledge_id, contains date and status
    // status is always true, if an activity didnt happen on a day there is no row
    // api has an order by pledge_id, date
    axios.get('http://localhost:3002/pledges_status')
      .then(res => {
        const data = res.data;
        // a default template object that populates missing days with false
        // hardcoded values need sorting, we just set it to run on 20th of month
        // need it to be actual date values
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

        // let arr=[];
        // let newObj={};
        //     let current_datetime = new Date();
        //     arr.push(current_datetime.toISOString().slice(0,10));
        //     newObj[current_datetime.toISOString().slice(0,10)]=false;
        //     let minusDate=new Date();
            
        //     for (let i=1; i<7; i++){
        //     minusDate.setDate(current_datetime.getDate()-i);
        //     arr.push(minusDate.toISOString().slice(0,10));
        //     newObj[minusDate.toISOString().slice(0,10)]=false;
        //     }


        // an empty array that will hold final outcome
        let resultsArr = [];
        // start with a copy of our default object
        let currObj = Object.assign({}, defaultObj)
        // set pledge id to be first pledge id
        currObj.pledge_id = data[0].pledge_id
        for (let i = 0; i < data.length; i++) {
          // if current iteration (i) pledge id matches current object then we are still on same pledge
          // obviously for first run it will  match
          if (data[i].pledge_id === currObj.pledge_id) {
            // overwrite day with true
            const day = data[i].pledge_date.slice(8, 10)
            currObj[day] = true
          } else {
            // we are onto a new pledge so push the old current obj to results array
            // reset current object from our default template
            // do the normal stuff of setting pledge id and overwriting day
            resultsArr.push(currObj)
            currObj = Object.assign({}, defaultObj)
            currObj.pledge_id = data[i].pledge_id
            const day = data[i].pledge_date.slice(8, 10)
            currObj[day] = true
          }
          // if we get to the end then we need to push current obj to results array
          if (i === data.length - 1) {
            resultsArr.push(currObj)
          }
        }
        console.log("original resultsArr", resultsArr)

        let today = 20; // hardcoded for now

        // an array of arrays
        // subarray for each pledge
        // will hold pledgeid then 7 values either true or false in ascending order
        let weekToDisplay = [];
        // for each element in array which corresponds to pledge
        resultsArr.map(p => {
          let insideArr = []
          // create an array, make first element pledgid
          insideArr.push(p.pledge_id)

          let compareDate = today;
          // for each date between today and 7 days ago
          // check if key value pair exists in object
          // write to array accordingly

          for (let l = 0; l < 7; l++) {
            compareDate = (today - l).toString();
            if (p[compareDate]) {
              insideArr.push(true)
            } else {
              insideArr.push(false)
            }
          }
          weekToDisplay.push(insideArr)
          return weekToDisplay;

        })
        // create proper state for all pledges with status bunged in
        const allPledges = this.state.tempPledge;
        // for all the pledges
        for (let j = 0; j < allPledges.length; j++) {
          // loop through all of the weektodisplays until find right one for pledge
          for (let k = 0; k < weekToDisplay.length; k++) {
            if (weekToDisplay[k][0] === allPledges[j].pledge_id) {
              allPledges[j].daily_status = weekToDisplay[k].slice(1)
            }
          }
          // if no rows in pledge status table pop blanks Helen added 16th to make adding pledge work
          if (!allPledges[j].daily_status) allPledges[j].daily_status=[false,false,false,false,false,false,false]
        }
        this.setState({
          pledges: allPledges
        })
      })
      .catch(err => console.log(err))
  }

  pledgeCount = () => this.state.pledges.length;

  addPledge = (newPledgeTitle, newPledgeDetail) => {
    const newPledge = {
      "pledge_title": newPledgeTitle,
      "pledge_detail": newPledgeDetail,
      "pledge_type": "D",
      "username": "HelenG",
      // Helen added Mon 16th so that add button would work
      "daily_status": [false, false, false, false, false, false, false]
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
