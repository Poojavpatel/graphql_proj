import React,{Component} from 'react';

import Modal from '../components/modal/modal'
import Backdrop from '../components/backdrop/backdrop'
import './events.css'

class EventsPage extends Component{
  state = {
    creating: false,
  };

  createEventHandler = () => {
    this.setState({creating:true});
  }

  modalCancelHandler = () => {
    this.setState({creating:false});
  }

  modalConfirmHandler = () => {
    this.setState({creating:false});
  }

  render(){
    return(
      <React.Fragment>
        {this.state.creating && <Backdrop/>}
        {this.state.creating && <Modal
          title="Add Event Modal"
          onCancel = {this.modalCancelHandler}
          onConfirm = {this.modalConfirmHandler}
          canCancel
          canConfirm>
          <p>Modal Content</p>
        </Modal>}
        <h1>Events Page</h1>
        <button onClick={this.createEventHandler}>Create Event</button>
      </React.Fragment>
    )
  }
}

export default EventsPage;