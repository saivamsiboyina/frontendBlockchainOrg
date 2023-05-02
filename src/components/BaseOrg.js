import { useState, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from 'react-responsive-carousel'
import {
    Stack,
    Button,
    DisplayText,
    Card,
    TextField
}
    from "@shopify/polaris";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ethers } from "ethers";
import YourContract from "../contractData.json";

function BaseOrg() {
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const [account, setAccount] = useState("");
    const [userAddress, setUserAddress] = useState('');
    const [baseAuthOrganization, setBaseAuthOrganization] = useState("");
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
    const handleGetPatientOrg = async () => {
            try {
              const data = contract.interface.encodeFunctionData("getPatientOrgList");
              console.log("Data", data);
              //   console.log(contract.methods.getPatientOrgList());
              //   const tx = {
              //     to: YourContract.address,
              //     data: data,
              //   };
              const tx = await signer.sendTransaction({
                to: YourContract.address,
                data: data,
              });
              // console.log("Data", data);
              const receipt = await tx.wait();
              // console.log("REciepit", receipt.result);
              // const result = contract.interface.decodeFunctionResult(
              //   "getPatientOrgList",
              //   receipt.result
              // );
              // console.log(result);
              const patientOrgList = await contract.getPatientOrgList();
              console.log(patientOrgList);
              // console.log("Result", result[0]);
        
              // console.log("Trai", console.interface.decodeFunctionResult());
            } catch (error) {
              console.error(error);
            }
          };
    const getBaseAuth= async ()=>{
        const baseAuthAddress = await contract.baseAuthOrganization();
        setBaseAuthOrganization(baseAuthAddress);
    }
    const [value, setValue] = useState(0)
    return (
        <div style={{ padding: "30px" }}>
            <Stack vertical>
                <DisplayText size="small">
                    Base Auth Address
                </DisplayText>
                <Button
                    onClick={getBaseAuth}>
                    Base Auth Address
                </Button>
                <p>{baseAuthOrganization}</p>
                <hr />
                <DisplayText size="small">
                    Assign Donor Org
                </DisplayText>
                <Stack vertical>
                    <TextField
                        label=""
                        // value={bloodGrou}
                        // onChange={setBloodGroup}
                        autoComplete="off"
                    />
                    <Button
                        onClick={""}>
                        Submit
                    </Button>
                </Stack>
                <hr />
                <DisplayText size="small">
                    Assign Patient Org
                </DisplayText>
                <Stack vertical spacing="tight">
                    <TextField
                        label=""
                        // value={bloodGrou}
                        // onChange={setBloodGroup}
                        autoComplete="off"
                    />
                    <Button
                    onClick={handleAssignPatientOrg}
                    >
                        Submit
                    </Button>
                </Stack>
                <hr />
                <DisplayText size="small">
                    Get All Donors
                </DisplayText>
                <Stack vertical spacing="tight">
                    <TextField
                        label="Index"
                        // value={bloodGrou}
                        // onChange={setBloodGroup}
                        autoComplete="off"
                    />
                    <Button>
                        Submit
                    </Button>
                </Stack>
                <hr />
                <DisplayText size="small">
                    Get All Patients
                </DisplayText>
                <Stack vertical spacing="tight">
                    <TextField
                        label="Index"
                        // value={bloodGrou}
                        // onChange={setBloodGroup}
                        autoComplete="off"
                    />
                    <Button>
                        Submit
                    </Button>
                </Stack>
                <hr />
                <DisplayText size="small">
                    Organ Matching
                </DisplayText>
                <Button
                    onClick={() => setValue(4)}>
                    Organ Matching
                </Button>
                <hr />
                <DisplayText size="small">
                    Success Map
                </DisplayText>
                <Stack vertical spacing="tight">
                    <TextField
                        label="Index"
                        // value={bloodGrou}
                        // onChange={setBloodGroup}
                        autoComplete="off"
                    />
                    <Button>
                        Submit
                    </Button>
                </Stack>
                <hr />
                <DisplayText size="small">
                    Get Donor Org List
                </DisplayText>
                <Button
                    onClick={() => setValue(6)}>
                    Get Donor Org List
                </Button>
                <hr />
                <DisplayText size="small">
                    Get Patient Org List
                </DisplayText>
                <Button
                    onClick={handleGetPatientOrg}>
                    Get Patient Org List
                </Button>
            </Stack>
        </div>


    );
}

export default BaseOrg;
