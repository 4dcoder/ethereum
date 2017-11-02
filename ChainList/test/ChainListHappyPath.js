// Contract to be tested
var ChainList = artifacts.require("./ChainList.sol");

// Test suite
 contract('ChainList', function(accounts) {


  var chainListInstance;
  var seller = accounts[1];
  var buyer = accounts[2];
  var articleName = "article 1";
  var articleDescription = "Description for article 1";
  var articlePrice = 10;
  var buyerBalanceBeforeBuy, buyerBalanceAfterBuy;
  var sellerBalanceBeforeBuy, sellerBalanceAfterBuy;


  it("should be initialized with empty values", async () => {

    const instance = await ChainList.deployed();
    const data = await instance.getArticle.call();    

    assert.equal(data[0], 0x0, "seller must be empty");
    assert.equal(data[1], 0x0, "buyer must be empty");    
    assert.equal(data[2], '', "article name must be empty");
    assert.equal(data[3], '', "description must be empty");
    assert.equal(data[4].toNumber(), 0, "article price must be zero");

  });


  // Test case: sell an article

  it("should sell an article", async () => {

    const instance = await ChainList.deployed();
    await instance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {from: seller});
    const data = await instance.getArticle.call();

    assert.equal(data[0], seller, "seller must be " + seller);
    assert.equal(data[1], 0x0, "buyer must be empty");
    assert.equal(data[2], articleName, "article name must be " + articleName);
    assert.equal(data[3], articleDescription, "article descriptio must be " + articleDescription);
    assert.equal(data[4].toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));

  });


   // Test case: should check events
    it("should trigger an event when a new article is sold", async () => {

      // get instance of deployed contract      
      const instance = await ChainList.deployed();

      // sell article
      let receipt = await instance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {from: seller});
      
      assert.equal(receipt.logs.length, 1, "should have received one event");
      assert.equal(receipt.logs[0].args._seller, seller, "seller must be " + seller);
      assert.equal(receipt.logs[0].args._name, articleName, "article name must be " + articleName);
      assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));

    });

  

  // Test case: buy an article

  it("should buy an article", async () => {
    
    // record balances before buy
    buyerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(buyer), "ether");
    sellerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(seller), "ether");
      
    const instance = await ChainList.deployed();
    await instance.buyArticle({from: buyer, value: articlePrice});
    const data = await instance.getArticle.call();
    
    //  assert.equal(data[0], seller, "seller must be " + seller);
    assert.equal(data[1], buyer, "buyer must be " + buyer);
    assert.equal(data[2], articleName, "article name must be " + articleName);
    assert.equal(data[3], articleDescription, "article descriptio must be " + articleDescription);
    assert.equal(data[4].toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));
    
  });

});