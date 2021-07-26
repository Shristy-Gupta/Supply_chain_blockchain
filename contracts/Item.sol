pragma solidity ^0.6.0;
import "./ItemManager.sol";
contract Item{
    uint public priceInwei;
    uint public pricepaid;
    uint public index;
    ItemManager parentContract;
    constructor(ItemManager _parentContract, uint _priceInWei, uint _index)public{
        priceInwei=_priceInWei;
        index=_index;
        parentContract=_parentContract;
    }
    //To get payment
    receive()external payable{
        require(pricepaid==0,"Item is paid already");
        require(priceInwei==msg.value,"Only full payment is allowed");
        pricepaid+=msg.value;
        (bool success,)=address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)",index));
        require(success,"transaction wasnt successful. cancelling...");
    }
    fallback() external{}
}
