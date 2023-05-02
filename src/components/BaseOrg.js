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

function BaseOrg() {
    const handleDonor=()=>{
        
    }
    const [value,setValue]=useState(0)
    return (
        <div style={{padding:"30px"}}>
            <Stack vertical>
            <DisplayText size="small">
            Base Auth Address
                </DisplayText> 
                <Button
                onClick={()=>setValue(8)}>
                    Base Auth Address
                </Button>
                <hr/>
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
                    onClick={handleDonor}>
                        Submit
                    </Button>
                </Stack>
                <hr/>
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
                    <Button>
                        Submit
                    </Button>
                </Stack>
                <hr/>
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
                    <hr/>
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
                <hr/>  
                <DisplayText size="small">
                Organ Matching
                </DisplayText> 
                <Button
                onClick={()=>setValue(4)}>
                   Organ Matching
                </Button>
                <hr/>
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
                <hr/>
                <DisplayText size="small">
                Get Donor Org List
                </DisplayText> 
                <Button
                onClick={()=>setValue(6)}>
                    Get Donor Org List
                </Button>
                <hr/>
                <DisplayText size="small">
                Get Patient Org List
                </DisplayText> 
                <Button
                onClick={()=>setValue(7)}>
                   Get Patient Org List
                </Button>
            </Stack>
        </div>
        
        
    );
}

export default BaseOrg;
