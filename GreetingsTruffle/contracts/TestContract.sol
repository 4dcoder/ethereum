pragma solidity ^0.4.11;

contract TestContract {
     uint id;

     function TestContract() {
          id = 0;
     }

     function setId(uint _id) public {
          id = _id;
     }

     function getId() constant returns (uint) {
          return id;
     }
}