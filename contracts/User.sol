// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserNameStorage {
    string[] private userNames;

    function addUserName(string memory _userName) public {
        userNames.push(_userName);
    }

    function getUserNames() public view returns (string[] memory) {
        return userNames;
    }
}
