var Web3 = require('web3');


class Web3Wrapper {

  static coinbase = null;
  static coinbaseBalance = null;


    static web3Provider = null;

    static initWeb3() {
        
      console.log("start");
      
        let web3 = new Web3();
        
          console.log(" web 3 init");
         // if (typeof web3 !== 'undefined') {
        //    this.web3Provider = web3.currentProvider;
        //    web3 = new Web3(web3.currentProvider);
        //    console.log("existing web3");
        // } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            web3 = new Web3(this.web3Provider);
            console.log("new web3");
          //}
         //App.displayAccountInfo();
         //return App.initContract();
         console.log("done");



         web3.eth.getCoinbase(function(err, account) {
          if (err === null) {
            Web3Wrapper.coinbase = account;
            //$("#account").text(account);
            console.log(account);

            web3.eth.getBalance(account, function(err, balance) {
              if (err === null) {
                Web3Wrapper.coinbaseBalance = web3.fromWei(balance, "ether");
               // console.log(balance);
                
                console.log(web3.fromWei(balance, "ether") + " ETH");
              }
            });
          } else {
            console.log(err);
          }
        });
    }
}

export default Web3Wrapper;