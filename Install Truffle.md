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

6) Now point the Item manager contract in the deploy_contracts.js file
var SimpleStorage = artifacts.require("./ItemManager.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
7) Edit App.js(client-->src-->app.js file and import all the smart contracts that needs to be deployed
8) ![image](https://user-images.githubusercontent.com/26459890/127017052-940b2276-0dec-49c8-bd42-78280a33f3c5.png)


# To see the results

1) copy the address from the network key:
![image](https://user-images.githubusercontent.com/26459890/127040781-238d3456-2dad-4215-9f4a-669032f5560a.png)
2) Go to Remix choose following config and deploy
![image](https://user-images.githubusercontent.com/26459890/127041705-c8df2cda-5c41-4278-98d9-01585704e164.png)


