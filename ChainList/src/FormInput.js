import React from 'react';
import {form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class FormInput extends React.Component {

    constructor() {
      super();
      this.state = {
        item: '',
        reason: ''     
      };
    }

    handleItemChange(e) {
      this.setState({ item: e.target.value });
    }

    handleReasonChange(e) {
      this.setState({ reason: e.target.value }); 
    }
  
    render() {

      return (
        <form>
          <FormGroup
              controlId="formBasicText"
          >
          <br/>
          <ControlLabel>Item Name</ControlLabel>
          <FormControl
              type="text"
              placeholder="Enter text"
              onChange={this.handleItemChange.bind(this)}
          />
          <br/>
          <ControlLabel>Reason</ControlLabel>
          <FormControl
              type="text"
              placeholder="Enter text"
              onChange={this.handleReasonChange.bind(this)}
            />
            <ControlLabel>{this.state.item}</ControlLabel>:
            <ControlLabel>{this.state.reason}</ControlLabel>
          </FormGroup>

          
        </form>
      );
    }
  }
  
  export default FormInput;