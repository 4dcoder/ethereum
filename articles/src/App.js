import React from 'react';
import {PageHeader} from 'react-bootstrap';
import FlexExample from './FlexExample'
import Main from './Main'
import Input from './Input'
import './App.css';

class App extends React.Component {

  constructor() {
    this.setState({tag: "init"});
    App.initWeb3();

  }

  initWeb3() {
    this.setState({tag: "init web3"});
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
   // App.displayAccountInfo();
   // return App.initContract();
  }



  render() {
    
    return (
      
      <div>
        <PageHeader className="text-center">The Article Shop</PageHeader>

        <Input/>
        <br/>
        <label>aaa {this.state.tag}</label>
      </div>
    );
  }
}


export default App;
