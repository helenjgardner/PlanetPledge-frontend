import React from 'react';

class Pledge extends React.Component {

  render() {

    return (
      <div id='pledge'>
        <h3 className='pledge-title'>{this.props.title}</h3>
        <p className='pledge-details'>{this.props.detail}</p>
        <p>✓</p>
      </div>
    )}
}

export default Pledge;
