## Set up ethereum dev environment
- Install Homebrew for package management: 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Install xcode and run from command line, this is to assist homebrew: 
```
xcode-select --install
```

- Install NodeJS from homebrew. NodeJS is used for ethereum development: 
```
brew install node
```

- Install Geth from homebrew (way to interact with ethereum):
```
brew tap ethereum/ethereum
```
```
brew install ethereum
```

- Install TestRPC (develop and test contracts):
```
npm install -g ethereumjs-testrpc
```

- Install Truffle (framework to build and deploy contracts):
```
npm install -g truffle
```

- Download and install visual studio code:
```
https://code.visualstudio.com/docs/setup/mac
```

- Install solidity extension in visual studio code


## Create a genesis block
The contents of a basic genesis block is in this repo. Create genesis.json file under a specific directory, which we will initialize to be the data directory in the next step.


## Initialize a geth data dir
Whenever you run geth, you must specify the data directory you use here
In this repo, our data dir is `~/github.com/ethereum/private`
```
geth --datadir ~/github.com/ethereum/private init genesis.json
```

## Create accounts using geth
```
geth --datadir ~/github.com/ethereum/private account new
```

## List accounts using geth
```
geth --datadir ~/github.com/ethereum/private account list
```

## Create startnode.sh
The contents of startnode.sh is in this. This is a brief description of each param:
- networkid 4224: Provide a unique network id 
- mine: Node will start mining automatically when started  
- datadir "~/github.com/ethereum/private": specifies data dir 
- nodiscover: Node will not look for other nodes initially 
- rpc: Node will use rpc
- rpcport "8545": The rpc port 
- port "30303": The port on which the node will listen to other nodes 
- rpccorsdomain "*": accept any rpc domain 
- nat "any": accept any nat connection 
- rpcapi eth,web3,personal,net: Use these api's or libraries in your node
- unlock 0: unlock the first account we created
- password ~/github.com/ethereum/private/password.sec: specify password file 
- ipcpath "~/Library/Ethereum/geth.ipc": For Mist to connect to this later (only mac)
 

Run the following command to make startnode.sh executable:
```
chmod a+x startnode.sh
```

## Run your node and start mining
```
./startnode.sh
```

## Geth commands
- miner.start()
- miner.stop()
- eth.accounts
- eth.coinbase
- eth.getBalance(coinbase)
- eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value:web3.toWei(100,"ether")})
- web3.fromWei(someWeiValue, "ether") // converts from Wei to Ether
- web3.toWei(someWeiValue, "ether") // converts from Ether to Wei
- Full list: https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console


## Download and Install Mist
Mist is an ethereum UI to connect to your node
```
https://github.com/ethereum/mist/releases
```
Mist Gitter chat room: https://gitter.im/ethereum/mist


## MetaMask Chrome Extension
You can install the extension in your chrome and connect to a chain from there
```
https://metamask.io
```
```
https://slack.metamask.io
```


