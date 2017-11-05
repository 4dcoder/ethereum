import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../css/App.css'
import '../css/flex.css';
import '../css/react-bootstrap-table.css';
import 'bootstrap/dist/css/bootstrap.css';

import Input from './Input'
import TruffleContract from 'truffle-contract';
import BootstrapTable from 'reactjs-bootstrap-table';
import React, { Component } from 'react'
import {PageHeader, Modal, Button} from 'react-bootstrap';
import getWeb3 from '../utils/getWeb3'


class App extends Component {

  contracts = { };

  columns = [
    { name: 'seller', display: 'Sold By'  },
    { name: 'buyer', display: 'Bought By'  },
    { name: 'name', display: 'Article Name'  },
    { name: 'description', display: 'Description'  },
    { name: 'price', display: 'Price'  }
  ];


  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      coinbase: null,
      coinbaseBalance: null,
      articles: {},
      showEventsModal: false,
      events: ''
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }


  instantiateContract() {

    let web3 = this.state.web3;

    var data = require('../contracts/ChainList.json');
    
    // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
    this.contracts.ChainList = TruffleContract(data);
    
    // Set the provider for our contract.
    this.contracts.ChainList.setProvider(web3.currentProvider);
    
    this.listenToEvents(this.reactToEvent.bind(this));    
    
    // Retrieve the article from the smart contract
    this.reloadArticles();
  }

  componentDidMount() {
   // this.listenToEvents(this.reactToEvent.bind(this));
    
  }

  displayAccountInfo() {
    
    let web3 = this.state.web3;

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
  
  
  
    // Listen for events raised from the contract
    async listenToEvents(callback) {
      
      let instance = await this.contracts.ChainList.deployed();
  
        instance.sellArticleEvent({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event) {
          callback(event);
          console.log("event received: " + event.args._name + ' is for sale.\n');
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
      await this.displayAccountInfo();
  
      let articlesInstance = await this.contracts.ChainList.deployed();
      this.setState({articlesInstance: articlesInstance});

      let article = await articlesInstance.getArticle.call();
  
      if (article[0] == 0x0) {
        console.log("no articles");
        return;
      }
  
      let web3 = this.state.web3;

      let seller = article[0];
      let buyer = article[1];
      let name = article[2];
      let description = article[3];
      let price = web3.fromWei(article[4],"ether").toNumber();
  
      this.setState({articles: {
        "seller": seller,
        "buyer": buyer,
        "name": name,
        "description": description,
        "price": price
      }});
    }

    closeEventsModal(e) {
      this.setState({showEventsModal: false});
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
            <Input web3={this.state.web3} articlesInstance={this.state.articlesInstance} coinbase={this.state.coinbase}/>
            <div className="flex-div"></div>
            <Button bsStyle="primary" bsSize="large" onClick={this.displayEvents.bind(this)}>Events</Button>
          </div>
  
          <BootstrapTable  columns={this.columns} data={[this.state.articles]} headers={true} />
  
          <br/>
  
          <Modal show={this.state.showEventsModal} onHide={this.closeEventsModal.bind(this)}>
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
  
    

  
}

export default App
