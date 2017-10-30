import React from 'react';
import {PageHeader} from 'react-bootstrap';
import Input from './Input'
import './css/App.css';
import './css/flex.css';
import 'bootstrap/dist/css/bootstrap.css';
import TruffleContract from 'truffle-contract';
import BootstrapTable from 'reactjs-bootstrap-table';

var Web3 = require('web3');
var web3 = new Web3();

class App extends React.Component {

  web3Provider = null;
  contracts = { };
  

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
       this.initiateContract();
  
  }

  displayAccountInfo() {
  
    // make web3 call to get coinbase account
    web3.eth.getCoinbase(function(err, account) {
      
      if (err === null) {          
        this.setState({coinbase:account});

        // once we have 
        web3.eth.getBalance(account, function(err, balance) {
          if (err === null) {
            this.setState({coinbaseBalance:web3.fromWei(balance.toNumber(), "ether")});
          }
        }.bind(this));
      }
    }.bind(this));
  }

  initiateContract() {

    var data = require('./ChainList.json');
  
    // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
    this.contracts.ChainList = TruffleContract(data);
    
    // Set the provider for our contract.
    this.contracts.ChainList.setProvider(this.web3Provider);
    
    // Retrieve the article from the smart contract
    this.reloadArticles();
 
  }

  async reloadArticles() {

    // refresh account information because the balance may have changed
    this.displayAccountInfo();

    let instance = await this.contracts.ChainList.deployed();
    let data = await instance.getArticle.call();
    console.log(data);

    // this.contracts.ChainList.deployed().then(function(instance) {
    //   console.log(instance.getArticle.call());
    // }).then(function(article) {
      


    // }).catch(function(err) {
    //   console.log(err.message);
    // });
  }

  componentDidMount() {
    this.initWeb3();
  }

  render() {
    
    let data = [
      { id: 1, firstName: '123', lastName: '...', address: '...'},
      { id: 2, firstName: '456', lastName: '...', address: '...'}
    ];
    let columns = [
     { name: 'firstName', display: 'First Name'  },
     { name: 'lastName', display: 'Last Name'  },
     { name: 'address', display: 'Address'  }
   ];

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

        <BootstrapTable columns={columns} data={data} headers={true} />

        <br/>

      </div>
    );
  }
}


export default App;
