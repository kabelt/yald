// pragma solidity ^0.5.0;
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Yald {
    string public name;
    uint public musicCount = 0;
    uint public permissionCount = 0;
    uint public contract_bal = 0;
    mapping(uint => Single) public music;
    mapping(address => mapping (uint => uint)) public ownership;

    mapping(uint => address payable) public users;
    uint public userCount = 0;

    struct Contributor{
        string Name;
        uint royalty_perc; //sum up to 100 amoung all
        address payable wallet_address;
    }

    struct Single {
        uint id;
        string title;
        string author_name;
        string track;
        string artwork;
        string description;
        uint cir_supply;
        // uint cur_price;
        address payable author_address;
        Contributor contributor_1;
        Contributor contributor_2;
        Contributor contributor_3;
    }


    constructor() public {
        name = "Yald";
    }

    function get_token_amount(address _address, uint _single_id) public returns (uint) {
        return ownership[_address][_single_id];
    }

    // function uploadSingle(string memory _title, string memory _author_name, string memory _track, string memory _artwork, string memory _description) public {
    function uploadSingle(string memory _title, string memory _author_name, string memory _track, string memory _artwork, string memory _description, Contributor memory _contributor_1, Contributor memory _contributor_2, Contributor memory _contributor_3) public {
        // Make sure all the info exist
        require(bytes(_title).length > 0);
        require(bytes(_author_name).length > 0);
        require(bytes(_track).length > 0);
        require(bytes(_artwork).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender!=address(0));
        // Make sure _contribution info is valid
        require(_contributor_1.royalty_perc + _contributor_2.royalty_perc + _contributor_3.royalty_perc == 100);
        require(bytes(_contributor_1.Name).length > 0 && bytes(_contributor_2.Name).length > 0 && bytes(_contributor_3.Name).length > 0);
        require(_contributor_1.wallet_address!=address(0) || _contributor_2.wallet_address!=address(0) || _contributor_3.wallet_address!=address(0));

        // Increment image id
        musicCount ++;
        music[musicCount] = Single(musicCount, _title, _author_name, _track,  _artwork, _description, 0, msg.sender, _contributor_1, _contributor_2, _contributor_3);
    }

    function sellToken(uint _id, uint amount, uint cost) public payable {//cost in wei
        //reduce the token's ownership
        require(_id > 0 && _id <= musicCount);
        require(ownership[msg.sender][_id] >= amount);
        ownership[msg.sender][_id] = ownership[msg.sender][_id] - amount;
        //fetch the single
        Single memory _single = music[_id];
        //decrease circulating supply
        _single.cir_supply = _single.cir_supply - amount;

        //give the rest 10% to the artist
        uint for_artist = cost * 10 / 100;
        if (_single.contributor_1.wallet_address != address(0)){
            (_single.contributor_1.wallet_address).transfer(for_artist * _single.contributor_1.royalty_perc / 100);
        }
        if (_single.contributor_2.wallet_address != address(0)){
            (_single.contributor_2.wallet_address).transfer(for_artist * _single.contributor_2.royalty_perc / 100);
        }
        if (_single.contributor_3.wallet_address != address(0)){
            (_single.contributor_3.wallet_address).transfer(for_artist * _single.contributor_3.royalty_perc / 100);
        }

        uint for_holders = cost * 5 / 100;
        for (uint i=1; i<=userCount; i++){
            if (ownership[users[i]][_id] > 0 && users[i] != msg.sender){
                users[i].transfer(for_holders * ownership[users[i]][_id] / _single.cir_supply);
            }
        }

        //update the single
        music[_id] = _single;
        //give seller the rest 85%
        msg.sender.transfer(cost - for_artist - for_holders);
        contract_bal = address(this).balance;
    }

    function buyToken(uint _id, uint amount) public payable { //the cost has already been calculated correctly from the web3
        // Make sure the id is valid
        require(_id > 0 && _id <= musicCount);
        // Fetch the single
        Single memory _single = music[_id];
        //give 10% to contributors
        uint for_artist = msg.value * 10 / 100;
        if (_single.contributor_1.wallet_address != address(0)){
            (_single.contributor_1.wallet_address).transfer(for_artist * _single.contributor_1.royalty_perc / 100);
        }
        if (_single.contributor_2.wallet_address != address(0)){
            (_single.contributor_2.wallet_address).transfer(for_artist * _single.contributor_2.royalty_perc / 100);
        }
        if (_single.contributor_3.wallet_address != address(0)){
            (_single.contributor_3.wallet_address).transfer(for_artist * _single.contributor_3.royalty_perc / 100);
        }

        //give 5% to holders
        bool is_registered = false;
        uint for_holders = msg.value * 5 / 100;
        for (uint i=1; i<=userCount; i++){
            if (users[i] == msg.sender){
                is_registered = true;
            }
            if (ownership[users[i]][_id] > 0){
                users[i].transfer(for_holders * ownership[users[i]][_id] / _single.cir_supply);
            }
        }

        //add user's address to list, if hasn't done so
        if (!is_registered){
            userCount++;
            users[userCount] = msg.sender;
        }
        //add cir_supply
        _single.cir_supply = _single.cir_supply + amount;
        // Update the single
        music[_id] = _single;
        //Update ownership
        ownership[msg.sender][_id] = ownership[msg.sender][_id] + amount;
        contract_bal = address(this).balance;
  }