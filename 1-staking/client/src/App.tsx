import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import './App.css';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");

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
      <p className='info-text'>Time remaining: </p>
      <p className='info-text'>Total staked: 0.000/0.000</p>
      <p className='info-text'>You staked: 0.000 eth</p>

      <div className="button-container"> 
        <button onClick={stake} className="cta-button connect-wallet-button">
          Stake 0.5 Eth!
        </button>
        <button onClick={stake} className="cta-button connect-wallet-button">
          Execute
        </button>
        <button onClick={stake} className="cta-button connect-wallet-button">
          Withdraw
        </button>
      </div>
    </div>
  );

  const stake = () => {};

  useEffect(() => {}, []);

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
