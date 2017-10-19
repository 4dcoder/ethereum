pragma solidity ^0.4.11;

contract TestContract {
     int id;

     function TestContract() {
          id = 0;
     }

     function setId(int _id) public {
          id = _id;
     }

     function getId() constant returns (int) {
          return id;
     }
}