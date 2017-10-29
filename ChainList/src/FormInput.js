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
  
    handleChange(e) {
      // this.setState( {
      //   item: this.refs.r1.value,
      //   reason: this.refs.r2.value
      // });

      // console.log(this.state.item);
      // console.log(this.state.reason);

      console.log(e.target.id);
      

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
          <input id="r3" type="text" onChange={this.handleChange.bind(this)}/>
          <br/>
          <ControlLabel>Item Name</ControlLabel>
          <FormControl
              //id="t"
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