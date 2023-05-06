import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AppProvider,
  DisplayText,
  Card,
  Stack,
  Button,
} from "@shopify/polaris";
import LandingPage from "./components/LandingPage";
import translations from "@shopify/polaris/locales/en.json";
import PatientOrg from "./components/PatientOrg";
import DonorOrg from "./components/DonorOrg";
import BaseOrg from "./components/BaseOrg";
// import { Web3ModalProvider, useWeb3Modal } from "web3modal";
import "./App.css";
import BaseOrgButtons from "./components/BaseOrgButtons";

function App() {
  const [connected, setConnected] = useState(false);
  // const [buttonClicked, setButtonClicked] = useState("");

  useEffect(() => {
    async function checkWallet() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setConnected(true);
          } else {
            setConnected(false);
          }
        } catch (err) {
          console.log(err);
          setConnected(false);
        }
      }
    }
    checkWallet();
  }, []);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        setConnected(true);
      } catch (err) {
        console.log(err);
        setConnected(false);
      }
    }
  };

  return (
    <AppProvider i18n={translations}>
      {!connected ? (
        <div className="card">
          <Stack distribution="center" alignment="center" vertical>
            <Card>
              <div className="title" style={{ padding: "40px" }}>
                <DisplayText size="large">
                  Welcome to the Decentralized Organ Donation system, Kindly
                  connect your wallet to Proceed!
                </DisplayText>
              </div>
            </Card>
            <Button size="large" onClick={handleButtonClick}>
              Connect to Wallet
            </Button>
          </Stack>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/patient" element={<PatientOrg />} />
            <Route path="/base" element={<BaseOrg />} />
            <Route path="/donor" element={<DonorOrg />} />
          </Routes>
        </BrowserRouter>
      )}
    </AppProvider>
    // <div className="app">
    //   {/* {!connected ? (
    //     <button className="connect-wallet" onClick={handleButtonClick}>
    //       Connect to Wallet
    //     </button>
    //   ) : ( */}
    //     <>
    //       <div className="button-container">
    //         <button
    //           className="green-button"
    //           onClick={() => setButtonClicked("Donor Org")}
    //         >
    //           Donor Org
    //         </button>
    //         <button
    //           className="yellow-button"
    //           onClick={() => setButtonClicked("Patient Org")}
    //         >
    //           Patient Org
    //         </button>
    //         <button
    //           className="red-button"
    //           onClick={() => setButtonClicked("Base Org")}
    //         >
    //           Base Org
    //         </button>
    //         {buttonClicked === "Base Org" && <BaseOrgButtons />}
    //       </div>
    //       {buttonClicked && (
    //         <div className="result">Button clicked: {buttonClicked}</div>
    //       )}
    //     </>
    //   {/* )} */}
    // </div>
  );
}

export default App;
