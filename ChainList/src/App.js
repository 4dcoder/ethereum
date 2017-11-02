import React from 'react';
import {PageHeader, Modal, Button} from 'react-bootstrap';
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
      articles: {},
      showEventsModal: false,
      events: '\n'
    };
  }

  
  initWeb3() {
      
      console.log("what is web3 right now: " + web3);

       if (typeof web3 !== 'undefined') {
         this.web3Provider = web3.currentProvider;
         web3 = new Web3(web3.currentProvider);
         console.log("existing web3: provider " + typeof web3);
      } else {

          this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
          web3 = new Web3(this.web3Provider);
          console.log("new web3");
        }

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

    var data = require('./contracts/ChainList.json');
  
    // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
    this.contracts.ChainList = TruffleContract(data);
    
    // Set the provider for our contract.
    this.contracts.ChainList.setProvider(this.web3Provider);

    this.listenToEvents(this.reactToEvent.bind(this));
    //this.setState({contracts: this.contracts});
    
    // Retrieve the article from the smart contract
    this.reloadArticles();
 
  }


  // Listen for events raised from the contract
  async listenToEvents(callback) {
    
    let instance = await this.contracts.ChainList.deployed();

    
      instance.sellArticleEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        
        callback(event);
        console.log(event.args._name + ' is for sale.\n');
      });
    
  }

  reactToEvent(event) {
    this.setState({events: this.state.events + event.args._name + ' is for sale. ' + '\n'});        
    this.reloadArticles();
  }

  displayEvents() {
    this.setState({showEventsModal: true});    
  }
  

  async reloadArticles() {


    // refresh account information because the balance may have changed
    this.displayAccountInfo();

    this.articlesInstance = await this.contracts.ChainList.deployed();
    let article = await this.articlesInstance.getArticle.call();


    if (article[0] == 0x0) {
      console.log("no articles");
      return;
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
          <div className="flex-div"></div>
          <Button bsStyle="primary" bsSize="large" onClick={this.displayEvents.bind(this)}>Events</Button>
        </div>

        <BootstrapTable columns={this.columns} data={[this.state.articles]} headers={true} />

        <br/>

        <Modal show={this.state.showEventsModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              events
            </Modal.Header>

            <Modal.Body>
                {this.state.events}
            </Modal.Body>
            
        </Modal>
      </div>
    );
  }

  close(e) {
    this.setState({showEventsModal: false});
  }
}


export default App;
