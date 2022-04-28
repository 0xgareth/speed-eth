const main = async () => {
  const [owner] = await ethers.getSigners();

  const exampleFactory = await hre.ethers.getContractFactory('ExampleExternalContract');
  const exampleContract = await exampleFactory.deploy();
  await exampleContract.deployed();

  const stakerContractFactory = await hre.ethers.getContractFactory('Staker');
  const stakerContract = await stakerContractFactory.deploy(exampleContract.address);
  await stakerContract.deployed();

  console.log("Contract deployed to:", stakerContract.address);

  // balance before txn
  let contractBalance = await hre.ethers.provider.getBalance(stakerContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  // new txn to send eth to contract
  const txn = await owner.sendTransaction({
    to: stakerContract.address,
    value: ethers.utils.parseEther("1.0"),
  });
  await txn.wait();

  // balance after txn
  contractBalance = await hre.ethers.provider.getBalance(stakerContract.address);
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