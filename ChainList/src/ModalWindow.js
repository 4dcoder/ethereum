import {Popover, Tooltip, Button, Modal, OverlayTrigger} from 'react-bootstrap';
import React from 'react';
import FormInput from './FormInput';

class ModalWindow extends React.Component {

  
    constructor() {
        super();
        this.state = { showModal: true };
    }
  
    close(e) {
      this.setState({ showModal: false });
    }
  
    open(e) {
      this.setState({ showModal: true });
    }
  
    render() {
  
      return (
        
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Sell Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <FormInput/>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        
      );
    }
  }

  ModalWindow.defaultProps = {
    showModal: true
  }
  
  export default ModalWindow;