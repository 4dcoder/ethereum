pragma solidity ^0.4.11;

contract ChainList {
    // State variables
    address seller;
    address buyer;
    string name;
    string description;
    uint256 price;

    // Events
    // keyword 'indexed' makes the _seller column indexed (or we can filter by it.. it's like a key)
    event sellArticleEvent(address indexed _seller, string _name, uint256 _price);
    event buyArticleEvent(address indexed _seller, address indexed _buyer, string _name, uint256 _price);


    // sell an article
    function sellArticle(string _name, string _description, uint256 _price) public {
        seller = msg.sender;
        name = _name;
        description = _description;
        price = _price;
        sellArticleEvent(seller, name, price);
    }

    // get the article
    function getArticle() public constant returns (
        address _seller,
        string _name,
        string _description,
        uint256 _price) {
        return(seller, name, description, price);
    }

    function buyArticle() payable public {

        // make sure there is an article to sell
        require(seller != 0x0);

        // make sure buyer is not same as seller
        require(seller != msg.sender);

        // make sure article is not sold yet
        require(buyer == 0x0);

        // verify payable amount is equal to price
        require(price == msg.value);

        
        // change buyer
        buyer = msg.sender;

        // transfer the contract balance to the seller
        seller.transfer(msg.value);

        // invoke an event
        buyArticleEvent(seller, buyer, name, price);

    }
}
