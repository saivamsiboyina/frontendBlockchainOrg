import { useState, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from 'react-responsive-carousel'
import {
    Stack,
    Button,
    DisplayText,
    Card,
    Label,
    TextField,
    FormLayout
}
    from "@shopify/polaris";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function DonorOrg() {
    const [name, setName] = useState('')
    const [id,setId]=useState()
    const [bloodGroup,setBloodGroup]=useState('')
    const [organ,setOrgan]=useState('')
    return (
        <div className="org">
            <Stack spacing="extraLoose" vertical>
                <DisplayText size="large">
                    Donor Organization
                </DisplayText>
                <Card>
                <div style={{padding:"30px",width:"720px"}}>
                        <FormLayout>
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
                            <Button 
                            size="large"
                            primary
                            onClick={()=>{}}
                            >
                                Submit
                            </Button>
                        </Stack>
                        </FormLayout>
                    </div>
                </Card>
            </Stack>
        </div>
    );
}

export default DonorOrg;
