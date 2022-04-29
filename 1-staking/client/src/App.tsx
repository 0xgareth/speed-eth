import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/Staker.json"

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contractBalance, setContractBalance] = useState("0");
  const [userBalances, setUserBalances] = useState({});
  const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
  const contractABI = abi.abi;

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('get metamask!');
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected!", accounts[0]);
      setCurrentAccount(accounts[0]);
      
      getBalance();

    } catch (error) {
      console.log(error);
    }
  }  

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderConnected = () => (
    <div>
      <p className='info-text'>Total staked: {contractBalance}</p>
      <p className='info-text'>You staked: </p>

      <div className="button-container"> 
        <button onClick={stake} className="cta-button connect-wallet-button">
          Stake 0.5 Eth!
        </button>
        {/* <button onClick={stake} className="cta-button connect-wallet-button">
          Execute
        </button>
        <button onClick={stake} className="cta-button connect-wallet-button">
          Withdraw
        </button> */}
      </div>
    </div>
  );

  const stake = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakeContract = new ethers.Contract(contractAddress, contractABI, signer);
        const stakeTxn = await signer.sendTransaction({
          to: stakeContract.address,
          value: ethers.utils.parseEther("0.001"),
        });
        console.log("Mining...", stakeTxn.hash);
        await stakeTxn.wait();

        console.log("Txn success");

        getBalance();

      } else {
        console.log("Eth object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getBalance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const stakeContract = new ethers.Contract(contractAddress, contractABI, signer);
        // balance before txn
        const balance = await provider.getBalance(stakeContract.address);
        console.log("Contract balance:", ethers.utils.formatEther(balance));
        setContractBalance(ethers.utils.formatEther(balance));

        const addr = await signer.getAddress()
        const usrBalance = await stakeContract.balances(addr)
        const update = { addr : ethers.utils.formatEther(usrBalance)}
        setUserBalances(userBalances =>({
          ...userBalances,
          ...update
        }))
        console.log('updated userBalances:',userBalances)
        console.log(ethers.utils.formatEther(usrBalance))

      } else {
        console.log("Eth object doesn't exist!");
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Staking</p>
          <p className="sub-text">Stake your Eth</p>
          { currentAccount === "" ? ( 
              renderNotConnectedContainer() 
            ) : (  
              renderConnected()
            ) 
          }
        </div>
        <div className="footer-container"></div>
      </div>
    </div>
  );
}

export default App;
