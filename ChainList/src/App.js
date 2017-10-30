import React from 'react';
import {PageHeader} from 'react-bootstrap';
import Input from './Input'
import './css/App.css';
import './css/flex.css';
import 'bootstrap/dist/css/bootstrap.css';
import TruffleContract from 'truffle-contract';
import BootstrapTable from 'reactjs-bootstrap-table';

var Web3 = require('web3');
var web3;

class App extends React.Component {

  web3Provider = null;
  contracts = { };
  articlesInstance = null;

  columns = [
    { name: 'name', display: 'Article Name'  },
    { name: 'description', display: 'Description'  },
    { name: 'price', display: 'Price'  }
  ];
  

  constructor() {
    super();
    this.state = {
      coinbase: null,
      coinbaseBalance: null,
      articles: {}
    };
  }

  
  initWeb3() {
      
    console.log("start");
          
       if (typeof web3 !== 'undefined') {
         this.web3Provider = web3.currentProvider;
         web3 = new Web3(web3.currentProvider);
         console.log("existing web3: provider " + typeof web3);
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
  

    console.log("display accounts info");
    // make web3 call to get coinbase account
    web3.eth.getCoinbase(function(err, account) {
      
      if (err === null) {          
        this.setState({coinbase:account});

        // once we have 
        web3.eth.getBalance(account, function(err, balance) {
          if (err === null) {
            this.setState({coinbaseBalance:web3.fromWei(balance, "ether").toNumber()});
          }
        }.bind(this));
      }
    }.bind(this));
  }

  async initiateContract() {

    //var data = await fetch('./contracts/ChainList.json').then(res => res.json());
    var data = require('./contracts/ChainList.json');

    // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
    this.contracts.ChainList = TruffleContract(data);
    
    // Set the provider for our contract.
    this.contracts.ChainList.setProvider(this.web3Provider);

    this.setState({contracts: this.contracts});
    
    // Retrieve the article from the smart contract
    this.reloadArticles();
 
  }

  async reloadArticles() {


    // refresh account information because the balance may have changed
    this.displayAccountInfo();

    this.articlesInstance = await this.contracts.ChainList.deployed();
    let article = await this.articlesInstance.getArticle.call();
    console.log(article);


    if (article[0] == 0x0) {
      console.log("no articles");
      return;
    } else {
      console.log(article[0]);
      console.log(article[1]);
      console.log(article[2]);
      console.log(article[3]);
    }

    let name = article[1];
    let description = article[2];
    let price = web3.fromWei(article[3],"ether").toNumber();

    this.setState({articles: {
                            "name": name,
                            "description": description,
                            "price": price
                          }
                        
                  });
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
            <h4>{this.state.coinbaseBalance}</h4>
          </div>
          <div className="account-number">
          <h4>{this.state.coinbase}</h4>
            </div>
        </div>


        <div className="sell-button-div">
          <Input articlesInstance={this.articlesInstance} coinbase={this.state.coinbase} callback={this.reloadArticles.bind(this)}/>
        </div>

        <BootstrapTable columns={this.columns} data={[this.state.articles]} headers={true} />

        <br/>

      </div>
    );
  }
}


export default App;
