import { useState, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from "react-responsive-carousel";
import {
  Stack,
  Button,
  DisplayText,
  Card,
  TextField,
  Toast,
  Frame,
  Page,
} from "@shopify/polaris";
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
  const [patientmedicalid, setPatientMedicalID] = useState("");
  const [donormedicalid, setDonorMedicalID] = useState("");
  const [donorindex, setDonorIndex] = useState(0);
  const [successindex, setSuccessIndex] = useState(0);
  const [mappedID, setMappedID] = useState("");
  const [patient, setPatient] = useState({});
  const [donor, setDonor] = useState({});
  const [donorOrgList, setDonorOrgList] = useState([]);
  const [patientOrgList, setPatientOrgList] = useState([]);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  //   const [error4, setError4] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [success3, setSuccess3] = useState(false);
  const [success4, setSuccess4] = useState(false);

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
  const toggleError1 = () => {
    setError1(false);
  };
  const toggleError2 = () => {
    setError2(false);
  };
  const toggleError3 = () => {
    setError3(false);
  };

  const toggleSuccess1 = () => {
    setSuccess1(false);
  };
  const toggleSuccess2 = () => {
    setSuccess2(false);
  };
  const toggleSuccess3 = () => {
    setSuccess3(false);
  };
  const toggleSuccess4 = () => {
    setSuccess4(false);
  };

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
      setSuccess1(true);
    } catch (error) {
      console.error(error);
      setError1(true);
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
      setSuccess2(true);
    } catch (error) {
      console.error(error);
      setError1(true);
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
      setError1(true);
    }
  };

  // Get Donor details through Medical Id

  const handleGetAllDonorsMedicalIdList = async () => {
    try {
      console.log("Came to medical Id Donor!");
      const data = contract.interface.encodeFunctionData("getdonorsList", [
        donormedicalid,
      ]);
      console.log("Data", data);
      console.log("No error");
      const tx = await signer.sendTransaction({
        to: YourContract.address,
        data: data,
      });

      const receipt = await tx.wait();

      const result = await contract.getdonorsList(donormedicalid);

      setDonor({
        firstName: result.firstName,
        medicalID: result.medicalID,
        bloodGroup: result.bloodGroup,
        organ: result.organ,
      });
    } catch (error) {
      console.error(error);
      setError2(true);
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
      setError1(true);
    }
  };

  //Get All Patients List by Medical ID
  const handleGetAllPatientsMedicalIdList = async () => {
    try {
      console.log("Came to medical Id!");
      const data = contract.interface.encodeFunctionData("getpatientsList", [
        patientmedicalid,
      ]);
      console.log("Data", data);
      console.log("No error");
      const tx = await signer.sendTransaction({
        to: YourContract.address,
        data: data,
      });

      const receipt = await tx.wait();

      const result = await contract.getpatientsList(patientmedicalid);

      setPatient({
        firstName: result.firstName,
        medicalID: result.medicalID,
        bloodGroup: result.bloodGroup,
        organ: result.organ,
      });
    } catch (error) {
      console.error(error);
      setError3(true);
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
      setSuccess3(true);
    } catch (error) {
      console.error(error);
      setError1(true);
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
      setError1(true);
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
            <Button primary onClick={getBaseAuth}>
              Base Auth Address
            </Button>

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
              <Button primary onClick={handleAssignDonorOrg}>
                Assign
              </Button>
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
              <Button primary onClick={handleAssignPatientOrg}>
                Assign
              </Button>
            </Stack>
            <hr />
            {/* <DisplayText size="small">Get Donor (index)</DisplayText>
            <Stack vertical spacing="tight">
              <TextField
                label="Donor Index"
                value={donorindex}
                onChange={setDonorIndex}
                autoComplete="off"
              />
              <Button primary onClick={handleGetAllDonorList}>
                Get Donor
              </Button>
              {donor.firstName && (
                <div>
                  <h2>Donor Details through Index</h2>
                  <p>Donor Name: {donor.firstName}</p>
                  <p>Medical ID: {donor.medicalID}</p>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>Organ: {donor.organ}</p>
                </div>
              )}
            </Stack>
            <hr /> */}

            <DisplayText size="small">Get Donor (MedicalId)</DisplayText>
            <Stack vertical spacing="tight">
              <TextField
                label="Donor MedicalId"
                value={donormedicalid}
                onChange={setDonorMedicalID}
                autoComplete="off"
              />
              <Button primary onClick={handleGetAllDonorsMedicalIdList}>
                Get Donor
              </Button>
              {donor.firstName && (
                <div>
                  <h2>Donor Details through MedicalID</h2>
                  <p>Donor Name: {donor.firstName}</p>
                  <p>Medical ID: {donor.medicalID}</p>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>Organ: {donor.organ}</p>
                </div>
              )}
            </Stack>
            <hr />
            {/* 
            <DisplayText size="small">Get Patient (index)</DisplayText>
            <Stack vertical spacing="tight">
              <TextField
                label="Patient Index"
                value={patientindex}
                onChange={setPatientIndex}
                autoComplete="off"
                type="number"
              />
              <Button primary onClick={handleGetAllPatientList}>
                Get Patient
              </Button>
              {patient.firstName && (
                <div>
                  <h2>Patient Details through Index</h2>
                  <p>Patient Name: {patient.firstName}</p>
                  <p>Medical ID: {patient.medicalID}</p>
                  <p>Blood Group: {patient.bloodGroup}</p>
                  <p>Organ: {patient.organ}</p>
                </div>
              )} 
              </Stack> */}

            <DisplayText size="small">Get Patient (MedicalId)</DisplayText>
            <Stack vertical spacing="tight">
              <TextField
                label="Patient MedicalId"
                value={patientmedicalid}
                onChange={setPatientMedicalID}
                autoComplete="off"
              />
              <Button primary onClick={handleGetAllPatientsMedicalIdList}>
                Get Patient
              </Button>
              {patient.firstName && (
                <div>
                  <h2>Patient Details through MedicalId</h2>
                  <p>Patient Name: {patient.firstName}</p>
                  <p>Medical ID: {patient.medicalID}</p>
                  <p>Blood Group: {patient.bloodGroup}</p>
                  <p>Organ: {patient.organ}</p>
                </div>
              )}
            </Stack>
            <hr />
            <DisplayText size="small">Organ Matching</DisplayText>
            <Button primary onClick={runOrganMatching}>
              Organ Matching
            </Button>
            <hr />
            <DisplayText size="small">Success Map</DisplayText>
            <Stack vertical spacing="tight">
              <TextField
                label="Index"
                value={successindex}
                onChange={setSuccessIndex}
                autoComplete="off"
              />
              <Button primary onClick={handleSuccessMap}>
                Find
              </Button>
              {mappedID && (
                <div>
                  <h2>Found Match!!</h2>
                  <p>Corresponding Mapped ID: {mappedID}</p>
                </div>
              )}
            </Stack>
            <hr />
            <DisplayText size="small">Get Donor Org List</DisplayText>
            <Button primary onClick={handleGetDonorOrg}>
              Get Donor Org List
            </Button>
            {donorOrgList.length > 0 && (
              <div>
                <h2>Donor Organization Details: </h2>
                <ul>
                  {donorOrgList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <hr />
            <DisplayText size="small">Get Patient Org List</DisplayText>
            <Button primary onClick={handleGetPatientOrg}>
              Get Patient Org List
            </Button>
            {patientOrgList.length > 0 && (
              <div>
                <h2>Patient Organization Details: </h2>
                <ul>
                  {patientOrgList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </Stack>
          {error1 && (
            <Toast
              duration={3000}
              content={
                "UnAuthorized Address Detected!!, Access Denied! Only Base Auth Allowed!"
              }
              error
              onDismiss={toggleError1}
            />
          )}
          {error2 && (
            <Toast
              duration={3000}
              content={
                "UnAuthorized Address Detected!!, Access Denied! Only Base Auth and Donor Org Allowed!"
              }
              error
              onDismiss={toggleError2}
            />
          )}
          {error3 && (
            <Toast
              duration={3000}
              content={
                "UnAuthorized Address Detected!!, Access Denied! Only Base Auth and Patient Org Allowed!"
              }
              error
              onDismiss={toggleError3}
            />
          )}
          {success1 && (
            <Toast
              duration={3000}
              content={"Donor Organization Added Successfully!"}
              onDismiss={toggleSuccess1}
            />
          )}
          {success2 && (
            <Toast
              duration={3000}
              content={"Patient Organization Added Successfully!"}
              onDismiss={toggleSuccess2}
            />
          )}
          {success3 && (
            <Toast
              duration={3000}
              content={"Organ Matching Successfully Done!!"}
              onDismiss={toggleSuccess3}
            />
          )}
        </div>
      </Page>
    </Frame>
  );
}

export default BaseOrg;
