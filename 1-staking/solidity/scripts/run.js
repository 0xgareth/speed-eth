const main = async () => {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const exampleFactory = await hre.ethers.getContractFactory('ExampleExternalContract');
  const exampleContract = await exampleFactory.deploy();
  await exampleContract.deployed();

  const stakerContractFactory = await hre.ethers.getContractFactory('Staker');
  const stakerContract = await stakerContractFactory.deploy(exampleContract.address);
  await stakerContract.deployed();

  console.log("Contract deployed to:", stakerContract.address);


  const params = [{
    from: addr1,
    to: stakerContract.address,
    value: ethers.utils.parseEther("1") // 1 ether
  }];

  let txn = await hre.network.provider.send('eth_sendTransaction', params);
  await txn.wait();

  let contractBalance = await hre.ethers.provider.getBalance(stakerContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

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