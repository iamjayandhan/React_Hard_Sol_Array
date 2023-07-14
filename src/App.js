import React, { useState } from 'react';
import Web3 from 'web3';

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your actual contract address
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_userName",
        "type": "string"
      }
    ],
    "name": "addUserName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserNames",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const web3 = new Web3('http://localhost:8545'); // Replace with your actual Ethereum node URL
const contract = new web3.eth.Contract(abi, contractAddress);

function App() {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const addName = async () => {
    await contract.methods.addUserName(name).send({ from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' }); // Replace with your actual Ethereum address
    setName('');
  };

  const listNames = async () => {
    const userNames = await contract.methods.getUserNames().call();
    setNames(userNames);
  };

  return (
    <div className="App">
      <input type="text" value={name} onChange={handleInputChange} />
      <button onClick={addName}>Add name</button>
      <button onClick={listNames}>List names</button>
      {/* <p>Names: {names.join(', ')}</p> */}
      <p>Names:</p>
      {names.map((name, index) => (
      <p key={index}>{name}</p>
))}

    </div>
  );
}

export default App;
