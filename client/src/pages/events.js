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
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={this.titleElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={this.priceElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={this.dateElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                ref={this.descriptionElRef}
              />
            </div>
          </form>
        </Modal>}
        <div className="margin-me">
          <h1>Events Page</h1>
          <button className="btn" onClick={this.createEventHandler}>Create Event</button>
        </div>
      </React.Fragment>
    )
  }
}

export default EventsPage;