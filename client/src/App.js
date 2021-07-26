import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json"
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false,cost: 0,itemName:"Example1" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
       this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.contract1 = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId] && ItemManagerContract.networks[this.networkId].address,
      );
      this.contract2 = new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId] && ItemContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToPaymentEvent();
      this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  handleInputChange=(event)=>{
   console.log(event.target);
    const target=event.target;
    // const value=target.type==="checkbox"? target.checked:target.value;
    // const name=target.name;
    //console.log(name);
    this.setState({
      [target.name]:target.type==="checkbox"? target.checked:target.value
    });
  }
  listenToPaymentEvent=()=>{
    let self=this;
    this.contract1.events.SupplyChainStep().on("data", async function(evt){
        console.log(evt);
        let itemObj=await self.contract1.methods.items(evt.returnValues._itemIndex).call();
        alert("Item: "+itemObj._identifier+" was paid,deliver it now!");
    });
  }
  handleSubmit=async()=>{
    const {cost,itemName}=this.state;
    let result=await this.contract1.methods.createItem(itemName,cost).send({from: this.accounts[0]});
    alert("Send "+cost+" wei to "+result.events.SupplyChainStep.returnValues._itemAddress);
  }
  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Event Trigger / Supply Chain Example</h1>
        <p>Items</p>
        <h2>Smart Contract Example</h2>
         Cost in Wei:<input type="text" name="cost" value={this.state.cost} onChange={this.handleInputChange}/>
         Item Identifier:<input type="text" name="itemName" value={this.state.itemName} onChange={this.handleInputChange}/>
         <button type="button" onClick={this.handleSubmit}>Create new Item</button>
      </div>
    );
  }
}

export default App;
