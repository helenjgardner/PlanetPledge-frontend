import React from 'react';

class Pledge extends React.Component {

  handleClickDel=()=>{
    this.props.deleteFunc(this.props.id);
  }

  render() {

    return (
      <div id='pledge'>
        <h3 className='pledge-title'>{this.props.title}</h3>
        <p className='pledge-details'>{this.props.detail}</p>
        <p>✓</p>
        <button type="button" onClick={this.handleClickDel}> Delete </button>
      </div>
    )}
}

export default Pledge;
