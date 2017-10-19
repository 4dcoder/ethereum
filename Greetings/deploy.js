Web3 = require('web3');
fs = require('fs');
solc = require('solc');

// 1. create web3 instance to connect to testrpc
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// 2. read source code
sourceCode = fs.readFileSync('Greetings.sol').toString();

// 3. compile code
compiledCode = solc.compile(sourceCode);

// 4. extract contract ABI from compiled code (which is just json)
contractABI = JSON.parse(compiledCode.contracts[':Greetings'].interface)

// 5. extract bytecode from contract
bytecode = compiledCode.contracts[':Greetings'].bytecode;

// 6. instantiate a contract on testrpc using contractABI
greetingsContract = web3.eth.contract(contractABI);

// 7. deploy contract, must give data which is bytecode and the from account and the gas
greetingsDeployed = greetingsContract.new({data: bytecode, from: web3.eth.accounts[0], gas: 4700000});

// 8. get an instance of the deployed contract
greetingsInstance = greetingsContract.at(greetingsDeployed.address);