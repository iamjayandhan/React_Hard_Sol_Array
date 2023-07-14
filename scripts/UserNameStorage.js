const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Compile the contract
  const contractName = "UserNameStorage";
  const contractPath = "E:/ReHarSol/contracts/User.sol"; // Adjust the path based on your project structure
  const contractSource = fs.readFileSync(contractPath, "utf8");

  // Deploy the contract
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();

  console.log("Contract address:", contract.address);

  // Save contract address to a file
  const deploymentFilePath = "artifacts/contracts/User.sol/UserNameStorage.json"; // Adjust the path based on your project structure
  const deploymentData = {
    contractName,
    address: contract.address,
    abi: JSON.parse(contract.interface.format("json")),
  };
  fs.writeFileSync(deploymentFilePath, JSON.stringify(deploymentData, null, 2));

  console.log("Deployment data saved to:", deploymentFilePath);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
