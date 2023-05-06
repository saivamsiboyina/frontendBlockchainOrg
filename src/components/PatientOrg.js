import { useState, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from "react-responsive-carousel";
import {
  Stack,
  Button,
  DisplayText,
  Card,
  Toast,
  Frame,
  Label,
  TextField,
} from "@shopify/polaris";

import "../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ethers } from "ethers";
import YourContract from "../contractData.json";

function PatientOrg() {
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [bloodGroup, setBloodGroup] = useState("");
  const [organ, setOrgan] = useState("");
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const toggleError = () => {
    setError(false);
  };

  const toggleSuccess = () => {
    setSuccess(false);
  };

  const handleFormSubmit = async () => {
    try {
      console.log("INvisiblePatientForm");
      const data = contract.interface.encodeFunctionData("addPatient", [
        name,
        id,
        bloodGroup,
        organ,
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
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError(true);
    }

    //Reset to Defaults
    setName("");
    setId("");
    setBloodGroup("");
    setOrgan("");
  };

  return (
    <Frame>
      <div className="org">
        <Stack spacing="extraLoose" vertical>
          <DisplayText size="large">Patient Organization</DisplayText>
          <Card>
            <div style={{ padding: "30px", width: "720px" }}>
              <Stack vertical spacing="loose">
                <TextField
                  label="Name"
                  value={name}
                  onChange={setName}
                  autoComplete="off"
                />
                <TextField
                  label="Medical ID"
                  value={id}
                  onChange={setId}
                  autoComplete="off"
                />
                <TextField
                  label="Blood Group"
                  value={bloodGroup}
                  onChange={setBloodGroup}
                  autoComplete="off"
                />
                <TextField
                  label="Organ"
                  value={organ}
                  onChange={setOrgan}
                  autoComplete="off"
                />
                <Stack distribution="trailing">
                  <Button size="large" primary onClick={handleFormSubmit}>
                    Add Patient
                  </Button>
                </Stack>
              </Stack>
            </div>
          </Card>
        </Stack>
        {error && (
          <Toast
            duration={3000}
            content={
              "UnAuthorized Address Detected!!, Access Denied! Only Patient Auth Allowed!"
            }
            error
            onDismiss={toggleError}
          />
        )}
        {success && (
          <Toast
            duration={3000}
            content={"Patient Added Successfully!"}
            onDismiss={toggleSuccess}
          />
        )}
      </div>
    </Frame>
  );
}

export default PatientOrg;
