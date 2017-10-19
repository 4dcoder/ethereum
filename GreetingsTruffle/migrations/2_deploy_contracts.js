var Greetings = artifacts.require("./Greetings.sol");
var TestContract = artifacts.require("./TestContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Greetings);
  deployer.deploy(TestContract);  
};
