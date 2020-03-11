import React from 'react';

class AddPledge extends React.Component {

  handleAddPledge = e => {
    e.preventDefault()
    this.props.addPledgeFunc()
    this.props.onClose()
  }

  render() {
    return (
      <>
        <h1 id="add-header">Add a Pledge</h1>
        <form>
          <label className="addPledge-text">I pledge to...</label>
          <input type="text" id="pledge_title"></input>

          <label className="addPledge-text">I should do this because....</label>
          <input type="text" id="details"></input>

          <label className="addPledge-text">I will do this</label>
          <select id="cars">
            <option value="D">Daily</option>
            <option value="W">Weekly</option>
            <option value="C">Continuously</option>
          </select>

          <button onClick={this.handleAddPledge} id="addPledge-button">add pledge</button>
        </form>
        <br /><br /><br /><br />
      </>
    );
  }
}

export default AddPledge;
