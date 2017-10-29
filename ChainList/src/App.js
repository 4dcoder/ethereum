import React from 'react';
import {PageHeader} from 'react-bootstrap';
//import FlexExample from './FlexExample'
import Input from './Input'
import './App.css';
import './flex.css';
//import Web3Wrapper from './Web3Wrapper'
var Web3 = require('web3');
var web3 = new Web3();


class App extends React.Component {

  

  constructor() {
    super();
    this.state = {
      coinbase: null,
      coinbaseBalance: null
    };

    
  }

  
  initWeb3() {
      
    console.log("start");
          
       if (typeof web3.currentProvider !== 'undefined') {
         this.web3Provider = web3.currentProvider;
         web3 = new Web3(web3.currentProvider);
         console.log("existing web3" + web3.currentProvider);
      } else {
          this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
          web3 = new Web3(this.web3Provider);
          console.log("new web3");
        }
       //return App.initContract();
       console.log("done");

       this.displayAccountInfo();
  
  }

  displayAccountInfo() {

    web3.eth.getCoinbase(function(err, account) {
      
      if (err === null) {          

        this.setState({coinbase:account});

        web3.eth.getBalance(account, function(err, balance) {

          if (err === null) {
            this.setState({coinbaseBalance:web3.fromWei(balance.toNumber(), "ether")});
          }
        }.bind(this));

      }
    }.bind(this));
  }

  componentDidMount() {
    this.initWeb3();
  }

  render() {
    
    return (
      
      <div className="main-div">
        <PageHeader className="text-center">The Article Shop</PageHeader>

        <div className="flex-container">
          <div className="account-balance">
          {this.state.coinbaseBalance}
          </div>
          <div className="account-number">
            {this.state.coinbase}
            </div>
        </div>


        <div className="sell-button-div">
          <Input/>
        </div>
        <br/>

      </div>
    );
  }
}


export default App;
