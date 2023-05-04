import { useState, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from "react-responsive-carousel";
import { Stack, Button, DisplayText, Card, TextField, Toast,Frame,Page } from "@shopify/polaris";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ethers } from "ethers";
import YourContract from "../contractData.json";

function BaseOrg() {
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const [account, setAccount] = useState("");
    const [donorAddress, setDonorAddress] = useState("");
    const [patientAddress, setPatientAddress] = useState("");
    const [baseAuthOrganization, setBaseAuthOrganization] = useState("");
    const [patientindex, setPatientIndex] = useState(0);
    const [donorindex, setDonorIndex] = useState(0);
    const [successindex, setSuccessIndex] = useState(0);
    const [mappedID, setMappedID] = useState("");
    const [patient, setPatient] = useState({});
    const [donor, setDonor] = useState({});
    const [donorOrgList, setDonorOrgList] = useState([]);
    const [patientOrgList, setPatientOrgList] = useState([]);
    const [error, setError] = useState(false)

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

    // Base Auth Org --------------------------------------------------- >

    const getBaseAuth = async () => {
        const baseAuthAddress = await contract.baseAuthOrganization();
        setBaseAuthOrganization(baseAuthAddress);
    };
    const toggleError = () => {
        setError(false)
    }
    // Assign Donor Org --------------------------------------------------- >
    const handleAssignDonorOrg = async () => {
        try {
            console.log("INvisibleDonor");
            const data = contract.interface.encodeFunctionData("assignDonorOrg", [
                donorAddress,
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
            setError(true)
        }
    };

    // Assign Patient Org --------------------------------------------------- >
    const handleAssignPatientOrg = async () => {
        try {
            console.log("INvisiblePatient");
            const data = contract.interface.encodeFunctionData("assignPatientOrg", [
                patientAddress,
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
            setError(true)
        }
    };

    // Get All Donors List

    const handleGetAllDonorList = async () => {
        try {
            console.log("Came!");
            const data = contract.interface.encodeFunctionData("getAlldonorsList", [
                donorindex,
            ]);
            console.log("Data", data);
            console.log("No error");
            const tx = await signer.sendTransaction({
                to: YourContract.address,
                data: data,
            });

            const receipt = await tx.wait();

            const result = await contract.getAlldonorsList(donorindex);

            setDonor({
                firstName: result.firstName,
                medicalID: result.medicalID,
                bloodGroup: result.bloodGroup,
                organ: result.organ,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Get All Patients List

    const handleGetAllPatientList = async () => {
        try {
            console.log("Came!");
            const data = contract.interface.encodeFunctionData("getAllpatientsList", [
                patientindex,
            ]);
            console.log("Data", data);
            console.log("No error");
            const tx = await signer.sendTransaction({
                to: YourContract.address,
                data: data,
            });

            const receipt = await tx.wait();

            const result = await contract.getAllpatientsList(patientindex);

            setPatient({
                firstName: result.firstName,
                medicalID: result.medicalID,
                bloodGroup: result.bloodGroup,
                organ: result.organ,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Organ Matching

    const runOrganMatching = async () => {
        try {
            const data = contract.interface.encodeFunctionData("organMatching");
            console.log("Data", data);

            const tx = await signer.sendTransaction({
                to: YourContract.address,
                data: data,
            });

            const receipt = await tx.wait();
        } catch (error) {
            console.error(error);
        }
    };

    // Success Map

    const handleSuccessMap = async () => {
        try {
            const data = contract.interface.encodeFunctionData("SuccessMap", [
                successindex,
            ]);
            console.log("Data", data);
            const tx = await signer.sendTransaction({
                to: YourContract.address,
                data: data,
            });

            const receipt = await tx.wait();

            const result = await contract.SuccessMap(successindex);
            console.log(result);
            setMappedID(result);
        } catch (error) {
            console.error(error);
        }
    };

    // Get Donor Org --------------------------------------------------- >
    const handleGetDonorOrg = async () => {
        try {
            const data = contract.interface.encodeFunctionData("getDonorOrgList");
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
            const donorOrgList1 = await contract.getDonorOrgList();
            console.log(donorOrgList1);
            setDonorOrgList(donorOrgList1);
            // console.log("Result", result[0]);

            // console.log("Trai", console.interface.decodeFunctionResult());
        } catch (error) {
            console.error(error);
        }
    };

    // Get Patient Org --------------------------------------------------- >
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
            const patientOrgList1 = await contract.getPatientOrgList();
            console.log(patientOrgList1);
            setPatientOrgList(patientOrgList1);
            // console.log("Result", result[0]);

            // console.log("Trai", console.interface.decodeFunctionResult());
        } catch (error) {
            console.error(error);
        }
    };

    const [value, setValue] = useState(0);

    // JSX Return --------------------------------------------------------->
    return (
        <Frame>
            <Page>
                <div style={{ padding: "30px" }}>
                    <Stack vertical>
                        <DisplayText size="small">Base Auth Address</DisplayText>
                        <Button primary onClick={getBaseAuth}>Base Auth Address</Button>

                        {baseAuthOrganization && (
                            <div>
                                <p>Base Authorization Address: {baseAuthOrganization}</p>
                            </div>
                        )}
                        <hr />
                        <DisplayText size="small">Assign Donor Org</DisplayText>
                        <Stack vertical>
                            <TextField
                                label=""
                                value={donorAddress}
                                onChange={setDonorAddress}
                                autoComplete="off"
                            />
                            <Button primary onClick={handleAssignDonorOrg}>Assign</Button>
                        </Stack>
                        <hr />
                        <DisplayText size="small">Assign Patient Org</DisplayText>
                        <Stack vertical spacing="tight">
                            <TextField
                                label=""
                                value={patientAddress}
                                onChange={setPatientAddress}
                                autoComplete="off"
                            />
                            <Button primary onClick={handleAssignPatientOrg}>Assign</Button>
                        </Stack>
                        <hr />
                        <DisplayText size="small">Get All Donors</DisplayText>
                        <Stack vertical spacing="tight">
                            <TextField
                                label="Donor Index"
                                value={donorindex}
                                onChange={setDonorIndex}
                                autoComplete="off"
                            />
                            <Button primary onClick={handleGetAllDonorList}>Get Donor</Button>
                            {donor.firstName && (
                                <div>
                                    <p>Donor Name: {donor.firstName}</p>
                                    <p>Medical ID: {donor.medicalID}</p>
                                    <p>Blood Group: {donor.bloodGroup}</p>
                                    <p>Organ: {donor.organ}</p>
                                </div>
                            )}
                        </Stack>
                        <hr />
                        <DisplayText size="small">Get All Patients</DisplayText>
                        <Stack vertical spacing="tight">
                            <TextField
                                label="Patient Index"
                                value={patientindex}
                                onChange={setPatientIndex}
                                autoComplete="off"
                                type="number"
                            />
                            <Button primary onClick={handleGetAllPatientList}>Get Patient</Button>
                            {patient.firstName && (
                                <div>
                                    <p>Patient Name: {patient.firstName}</p>
                                    <p>Medical ID: {patient.medicalID}</p>
                                    <p>Blood Group: {patient.bloodGroup}</p>
                                    <p>Organ: {patient.organ}</p>
                                </div>
                            )}
                        </Stack>
                        <hr />
                        <DisplayText size="small">Organ Matching</DisplayText>
                        <Button primary onClick={runOrganMatching}>Organ Matching</Button>
                        <hr />
                        <DisplayText size="small">Success Map</DisplayText>
                        <Stack vertical spacing="tight">
                            <TextField
                                label="Index"
                                value={successindex}
                                onChange={setSuccessIndex}
                                autoComplete="off"
                            />
                            <Button primary onClick={handleSuccessMap}>Find</Button>
                            {mappedID && (
                                <div>
                                    <p>Mapped ID: {mappedID}</p>
                                </div>
                            )}
                        </Stack>
                        <hr />
                        <DisplayText size="small">Get Donor Org List</DisplayText>
                        <Button primary onClick={handleGetDonorOrg}>Get Donor Org List</Button>
                        {donorOrgList.length > 0 && (
                            <ul>
                                {donorOrgList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                        <hr />
                        <DisplayText size="small">Get Patient Org List</DisplayText>
                        <Button primary onClick={handleGetPatientOrg}>Get Patient Org List</Button>
                        {patientOrgList.length > 0 && (
                            <ul>
                                {patientOrgList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </Stack>
                    {error && <Toast duration={3000} content={'Try with correct details'} error onDismiss={toggleError} />}
                </div>
            </Page>
        </Frame>
    );
}

export default BaseOrg;
