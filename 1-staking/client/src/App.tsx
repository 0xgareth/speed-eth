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

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Staking</p>
          <p className="sub-text">Stake your eth</p>
          { currentAccount === "" ? ( 
              renderNotConnectedContainer() 
            ) : (  
              <button className="cta-button connect-wallet-button">
                Stake Eth
              </button>
            ) 
          }
        </div>
        <div className="footer-container"></div>
      </div>
    </div>
  );
}

export default App;
