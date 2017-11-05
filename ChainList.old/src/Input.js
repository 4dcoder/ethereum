import {Button, Modal} from 'react-bootstrap';
import React from 'react';
import FormInput from './FormInput';
var Web3 = require('web3');
var web3 = new Web3();

class Input extends React.Component {

    constructor() {
        super();
        this.state = { showModal: false };
    }
  
    close() {
        this.setState({ showModal: false });
    }
  
    open(e) {
        this.setState({ showModal: true });
    }

    submit(e) {

        let name = this.refs.formInput.state.name;
        let description = this.refs.formInput.state.description;
        let price = this.refs.formInput.state.price;

        let articlesInstance = this.props.articlesInstance;
        let coinbase = this.props.coinbase;
        articlesInstance.sellArticle(name, description, web3.toWei(price, "ether"), {from: coinbase, gas: 500000});
        this.props.callback();

        this.setState({showModal: false});
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