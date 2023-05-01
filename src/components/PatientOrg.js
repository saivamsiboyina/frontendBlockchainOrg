import { useState, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from 'react-responsive-carousel'
import {
    Stack,
    Button,
    DisplayText,
    Card,
    Label,
    TextField
}
    from "@shopify/polaris";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function PatientOrg() {
    const [name, setName] = useState('')
    const [id, setId] = useState()
    const [bloodGroup, setBloodGroup] = useState('')
    const [organ, setOrgan] = useState('')
    return (
        <div style={{ padding: "100px" }}>
            <Stack spacing="extraLoose" vertical >
                <DisplayText size="large">
                    Patient Organization
                </DisplayText>
                <Card>
                    <div style={{ padding: "30px",width:"720px" }}>
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
                                <Button
                                    size="large"
                                    primary
                                    onClick={() => { }}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </div>
                </Card>
            </Stack>
        </div>
    );
}

export default PatientOrg;
