import { useState, useEffect } from "react";
import { ethers } from "ethers";
import YourContract from "../contractData.json";

function ShowBaseOrgAddress({ closeModal }) {
  const [baseAuthOrganization, setBaseAuthOrganization] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        // Get provider and signer
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          YourContract.address,
          YourContract.abi,
          signer
        );
        const baseAuthAddress = await contract.baseAuthOrganization();
        setBaseAuthOrganization(baseAuthAddress);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return (
    <>
      <h2>BaseContract Address</h2>
      <p>{baseAuthOrganization}</p>
      <button onClick={closeModal}>Close</button>
    </>
  );
}

export default ShowBaseOrgAddress;
