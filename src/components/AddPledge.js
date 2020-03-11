import React from 'react';

class AddPledge extends React.Component {

  handleAddPledge = e => {
    e.preventDefault()
    // console.log("clicked")
    this.props.addPledgeFunc()
  }

  render() {
    return (
      <>
      <h1 id="add-header">Add a Pledge</h1>
        <form>
          <label>pledge name:</label>
          <input type="text" id="pledge_title"></input>
          <br /><br />
          <label>pledge details:</label>
          <input type="text" id="details"></input>
          <br /><br />
          <button onClick={this.handleAddPledge}>add pledge</button>
        </form>
        
      </>
    );
  }
}

export default AddPledge;
