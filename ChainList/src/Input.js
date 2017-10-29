import {Button, Modal} from 'react-bootstrap';
import React from 'react';
import FormInput from './FormInput';
import ModalWindow from './ModalWindow';

class Input extends React.Component {

    constructor() {
        super()
        this.state = { showModal: false };
    }
  
    close(e) {
        this.setState({ showModal: false });
    }
  
    open(e) {
        this.setState({ showModal: true });
    }

    submit(e) {
        console.log(this.refs.formInput.state);
    }
  
    render() {

      return (
        <div>
              
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open.bind(this)}>

            Sell Article
          </Button>
  
           <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Sell Article</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormInput ref="formInput"/>
            </Modal.Body>
            
            <Modal.Footer>
                <Button bsStyle="primary" bsSize="large" onClick={this.submit.bind(this)}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
  export default Input;