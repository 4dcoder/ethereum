// Contract to be tested
var ChainList = artifacts.require("./ChainList.sol");

// Test suite
 contract('ChainList', function(accounts) {


  var chainListInstance;
  var seller = accounts[1];
  var articleName = "article 1";
  var articleDescription = "Description for article 1";
  var articlePrice = 10;




  it("should be initialized with empty values", async () => {

    const instance = await ChainList.deployed();
    const data = await instance.getArticle.call();    

    assert.equal(data[0], 0x0, "seller must be empty");
    assert.equal(data[1], '', "article name must be empty");
    assert.equal(data[2], '', "description must be empty");
    assert.equal(data[3].toNumber(), 0, "article price must be zero");

  });


  // Test case: sell an article

  it("should sell an article", async () => {

    const instance = await ChainList.deployed();
    await instance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {from: seller});
    const data = await instance.getArticle.call();

    assert.equal(data[0], seller, "seller must be " + seller);
    assert.equal(data[1], articleName, "article name must be " + articleName);
    assert.equal(data[2], articleDescription, "article descriptio must be " + articleDescription);
    assert.equal(data[3].toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));

  });


   // Test case: should check events
    it("should trigger an event when a new article is sold", async () => {

      // get instance of deployed contract      
      const instance = await ChainList.deployed();

      // get instance of watcher
      //let watcher = instance.sellArticleEvent();

      // sell article
      let receipt = await instance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), {from: seller});
      
      // get events from watcher
      // let events = watcher.get();
      // assert.equal(events.length, 1, "should have received one event");
      // assert.equal(events[0].args._seller, seller, "seller must be " + seller);
      // assert.equal(events[0].args._name, articleName, "article name must be " + articleName);
      // assert.equal(events[0].args._price.toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));


      assert.equal(receipt.logs.length, 1, "should have received one event");
      assert.equal(receipt.logs[0].args._seller, seller, "seller must be " + seller);
      assert.equal(receipt.logs[0].args._name, articleName, "article name must be " + articleName);
      assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice, "ether"), "article price must be " + web3.toWei(articlePrice, "ether"));

    });

  });