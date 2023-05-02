import React, { useState } from "react";
import AssignPatientOrg from "./AssignPatientOrg";
import GetPatientOrg from "./GetPatientOrg";
import ShowBaseOrgAddress from "./ShowBaseOrgAddress";

function BaseOrgButtons() {
  const [showAssignPatient, setShowAssignPatient] = useState(false);
  const [showPatientOrg, setShowPatientOrg] = useState(false);
  const [showBaseOrgAddress, setShowBaseOrgAddress] = useState(false);

  const handleAssignPatientClick = () => {
    setShowAssignPatient(true);
  };

  const handleShowBaseOrgAddressClick = () => {
    setShowBaseOrgAddress(true);
  };

  const handleShowPatientOrgClick = () => {
    setShowPatientOrg(true);
  };

  return (
    <>
      <button className="purple-button" onClick={handleAssignPatientClick}>
        Assign Patient
      </button>
      <button className="purple-button" onClick={handleShowBaseOrgAddressClick}>
        BaseContract Address
      </button>
      <button className="orange-button">Button 2</button>

      {showAssignPatient && <AssignPatientOrg />}

      <button className="purple-button" onClick={handleShowPatientOrgClick}>
        Patient Org List
      </button>

      {showPatientOrg && <GetPatientOrg />}

      {showBaseOrgAddress && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowBaseOrgAddress(false)}
            >
              &times;
            </span>
            <ShowBaseOrgAddress
              closeModal={() => setShowBaseOrgAddress(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BaseOrgButtons;
