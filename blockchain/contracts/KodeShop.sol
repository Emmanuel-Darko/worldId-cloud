// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract KodeShop {
    address public owner;

    mapping(uint256 => Product) public products;
    mapping(address => Merchant) public merchants;
    mapping(uint256 => Sale) public pendingSales;
    mapping(uint256 => Sale) public completedSales;
    mapping(address => User) public users;

    uint256 public numProducts;
    uint256 public numSales;
    uint256[] private productIds; // Array to store product IDs

    struct Product {
        uint256 productId;
        string productName;
        string description;
        uint256 quantity;
        uint256 price;
        string[] images;
        address merchantAddress;
    }

    struct Sale {
        uint256 saleId;
        uint256 productId;
        address merchantAddress;
        address userId;
    }

    struct Merchant {
        address merchantAddress;
        string merchantName;
        string merchantLocation;
        string storeName;
        string[] productTags;
    }

    struct User {
        uint256 userId;
        address userAddress;
        string userName;
        string userLocation;
        uint256 kodePoints;
        uint256[] purchases;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owners can perform this action");
        _;
    }

    modifier onlyMerchants() {
        require(merchants[msg.sender].merchantAddress == msg.sender, "Only merchants can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerMerchant(address _merchantAddress, string memory _name, string memory _merchantLocation, string memory _storeName) public {
        merchants[_merchantAddress] = Merchant(_merchantAddress, _name, _merchantLocation, _storeName, new string[](0));
    }

    function addProduct(
        string memory _productName, 
        string memory _description, 
        uint256 _price, 
        uint256 _quantity,
        string[] memory _images
    ) public onlyMerchants {
        address _merchantAddress = msg.sender;
        uint256 _productId = ++numProducts;
        require(products[_productId].productId == 0, "Product ID already exists");   
        
        products[_productId] = Product(_productId, _productName, _description, _quantity, _price, _images, _merchantAddress);
        productIds.push(_productId); // Add product ID to the array
    }

    function removeProduct(uint256 _productId) public onlyMerchants {
        require(products[_productId].productId != 0, "Product does not exist");
        
        delete products[_productId];

        // Optional: remove from productIds array (costly operation)
    }

    // Function to fetch all products
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productIds.length);
        for (uint256 i = 0; i < productIds.length; i++) {
            allProducts[i] = products[productIds[i]];
        }
        return allProducts;
    }
}
