import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Pledge extends React.Component {

  handleClickDel = () => {
    this.props.deleteFunc(this.props.id);
  }

  render() {

    return (
      <div id='pledge'>
        <h3 className='pledge-title'>{this.props.title}</h3>
        <p className='pledge-details'>{this.props.detail}</p>
        <FontAwesomeIcon icon={faTrash} id="delete" onClick={this.handleClickDel} />

      </div>
    )
  }
}

export default Pledge;
