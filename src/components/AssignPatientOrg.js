import { useState, useEffect } from "react";
import { ethers } from "ethers";
import YourContract from "../contractData.json";

function AssignPatientOrgButton() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState("");
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        // Get provider and signer
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);

        // console.log(YourContract.address);
        const contract = new ethers.Contract(
          YourContract.address,
          YourContract.abi,
          signer
        );
        setContract(contract);

        // Get the current account from Metamask wallet
        const currentAccount = await signer.getAddress();
        setAccount(currentAccount);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleAssignPatientOrg = async () => {
    try {
      const data = contract.interface.encodeFunctionData("assignPatientOrg", [
        userAddress,
      ]);
      // console.log(contract.methods.)
      // const tx = {
      //   to: YourContract.address,
      //   data: data,
      // };
      const tx = await signer.sendTransaction({
        to: YourContract.address,
        data: data,
      });
      const result = await tx.wait();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Patient Org Address</h1>
      {provider && (
        <p>
          Connected to network: {provider.connection.url}. Account: {account}
        </p>
      )}
      <label>
        Enter user address:
        <input
          type="text"
          onChange={(e) => setUserAddress(e.target.value)}
          value={userAddress}
        />
      </label>
      {contract && (
        <>
          <button onClick={handleAssignPatientOrg}>Assign patient org</button>
        </>
      )}
    </div>
  );
}

export default AssignPatientOrgButton;
