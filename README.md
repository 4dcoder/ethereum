# How to set up ethereum dev environment
- Install Homebrew for package management: 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
- Install xcode and run from command line, this is to assist homebrew: 
```xcode-select --install```
- Install NodeJS from homebrew. NodeJS is used for ethereum development: 
```brew install node```
- Install Geth from homebrew (way to interact with ethereum):
```brew tap ethereum/ethereum```
```brew install ethereum```
- Install TestRPC (develop and test contracts):
```npm install -g ethereumjs-testrpc```
- Install Truffle (framework to build and deploy contracts):
```npm install -g truffle```
