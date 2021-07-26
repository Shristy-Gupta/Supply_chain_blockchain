# Steps to install truffle ✔

Truffle is a world-class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier. It is made for managing smart contract and connectivity with blockchain.

1) Open Powershell and check the current version --> npm -v --> node-v (dont use v14, use v13 and below)
2) npm install -g truffle
3) ![image](https://user-images.githubusercontent.com/26459890/126909465-7a193fc2-8842-4faf-8ff4-495170a9f65a.png)
4) we need to create a directory to work with so we will use init and unbox commands. Unbox command is like a boiler plate
5) NEW-ITEM 'supplychain' -ITEMTYPE DIRECTORY
6) On Powershell-->truffle unbox react
7) Download https://github.com/truffle-box/react-box

# To start truffle development ✔
1) truffle devlelopment--> Gives 10 accounts and 10 keys
2) migrate--> migarate the sc to test env
3) npm start--> goes to json connect metamask and works
4) Write your smart contracts in solidity folder
5) To specify the solidity version make following changes in the version of truffle.config file
const path = require("path");

module.exports = {

  // See <http://truffleframework.com/docs/advanced/configuration>
  
  // to customize your Truffle configuration!
  
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
  networks: {
    develop: {
      port: 8545
    }
  },
 compilers:{
   solc:{
     version:"0.6.1"
   }
   
 }
};
