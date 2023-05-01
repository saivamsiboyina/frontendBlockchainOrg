// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import YourContract from "../contractData.json";

// function GetPatientOrgButton() {
//   const [provider, setProvider] = useState(undefined);
//   const [signer, setSigner] = useState(undefined);
//   const [contract, setContract] = useState(undefined);
//   const [account, setAccount] = useState("");
//   //   const [userAddress, setUserAddress] = useState("");
//   //   const [patientOrgList, setPatientOrgList] = useState([]);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         // Get provider and signer
//         if (window.ethereum) {
//           await window.ethereum.request({ method: "eth_requestAccounts" });
//         }
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);
//         const signer = provider.getSigner();
//         setSigner(signer);

//         // console.log("ABI", typeof YourContract.abi);
//         // Instantiate the interface manually
//         // const contractInterface = new ethers.utils.Interface(YourContract.abi);

//         // console.log(YourContract.address);
//         const contract = new ethers.Contract(
//           YourContract.address,
//           YourContract.abi,
//           signer
//         );
//         setContract(contract);
//         // console.log("ContractInterface", contract.interface);
//         // console.log("Contract", contract);
//         // console.log("Funtions", contract.interface.functions);
//         // console.log(contract.interface.encodeFunctionData("getPatientOrgList"));
//         // console.log("Contract Address", YourContract.address);
//         // console.log(contract.interface.format(ethers.utils.FormatTypes.json));
//         // const baseAuthOrganization = await contract.baseAuthOrganization();
//         // console.log("Base Auth Organization:", baseAuthOrganization);
//         // console.log(typeof contract.interface);
//         // console.log(
//         //   contract.interface.encodeFunctionData("baseAuthOrganization")
//         // );

//         // Get the current account from Metamask wallet
//         const currentAccount = await signer.getAddress();
//         setAccount(currentAccount);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     init();
//   }, []);

//   const handleGetPatientOrg = async () => {
//     try {
//       const data = contract.interface.encodeFunctionData("getPatientOrgList");
//       console.log("Data", data);
//       //   console.log(contract.methods.getPatientOrgList());
//       //   const tx = {
//       //     to: YourContract.address,
//       //     data: data,
//       //   };
//       const tx = await signer.sendTransaction({
//         to: YourContract.address,
//         data: data,
//       });
//       // console.log("Data", data);
//       const receipt = await tx.wait();
//       // console.log("REciepit", receipt.result);
//       // const result = contract.interface.decodeFunctionResult(
//       //   "getPatientOrgList",
//       //   receipt.result
//       // );
//       // console.log(result);
//       const patientOrgList = await contract.getPatientOrgList();
//       console.log(patientOrgList);
//       // console.log("Result", result[0]);

//       // console.log("Trai", console.interface.decodeFunctionResult());
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Patient Org List Details</h1>
//       {provider && (
//         <p>
//           Connected to network: {provider.connection.url}. Account: {account}
//         </p>
//       )}

//       {contract && (
//         <>
//           <button onClick={handleGetPatientOrg}>Get patient org List</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default GetPatientOrgButton;

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import YourContract from "../contractData.json";

function GetPatientOrgButton() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState("");
  const [patientOrgList, setPatientOrgList] = useState([]);

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

  const handleGetPatientOrg = async () => {
    try {
      const patientOrgList = await contract.getPatientOrgList();
      setPatientOrgList(patientOrgList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Patient Org List Details</h1>
      {provider && (
        <p>
          Connected to network: {provider.connection.url}. Account: {account}
        </p>
      )}

      {contract && (
        <>
          <button onClick={handleGetPatientOrg}>Get patient org List</button>
          {patientOrgList.length > 0 && (
            <ul>
              {patientOrgList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default GetPatientOrgButton;
