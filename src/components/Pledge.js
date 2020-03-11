import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Pledge extends React.Component {

  state = {
    dailyStatus: [true, false, true, false, false, false, true]
  }

  handleClickDel = () => {
    this.props.deleteFunc(this.props.id);
  }

  render() {

    return (
      <div id='pledge'>
        <h3 className='pledge-title'>{this.props.title}</h3>
        <p className='pledge-details'>{this.props.detail}</p>
        <table><tbody>
          <tr>
            <td> Mon </td>
            <td> Tue </td>
            <td> Wed </td>
            <td> Thu </td>
            <td> Fri </td>
            <td> Sat </td>
            <td> Sun </td>
          </tr>
          <tr>
            <td>
              {this.state.dailyStatus[0] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
            <td>
              {this.state.dailyStatus[1] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
            <td>
              {this.state.dailyStatus[2] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
            <td>
              {this.state.dailyStatus[3] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
            <td>
              {this.state.dailyStatus[4] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
            <td>
              {this.state.dailyStatus[5] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
            <td>
              {this.state.dailyStatus[6] ? <span className="pledgeActive"> </span> : <span className="pledgeInactive">  </span>}
            </td>
          </tr>
          </tbody>
        </table>
        <FontAwesomeIcon icon={faTrash} id="delete" onClick={this.handleClickDel} />

      </div>
    )
  }
}

export default Pledge;
