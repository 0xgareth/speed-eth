const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const exampleFactory = await hre.ethers.getContractFactory('ExampleExternalContract');
    const exampleContract = await exampleFactory.deploy();
    await exampleContract.deployed();
  
    const stakerContractFactory = await hre.ethers.getContractFactory("Staker");
    const stakerContract = await stakerContractFactory.deploy(exampleContract.address);
    await stakerContract.deployed();
  
    console.log("Staker address: ", stakerContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();