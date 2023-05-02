import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from 'react-responsive-carousel'
import Check from './Check.png'
import '../App.css'
import {
    Stack,
    Button,
    DisplayText,
    Card
}
    from "@shopify/polaris";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function LandingPage() {
    return (
        <Stack spacing="extraLoose" vertical alignment="center">
                <Carousel
                    autoPlay
                    interval={10000}
                    infiniteLoop
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}>
                    <div className="img-container">
                        <p>Check Test1</p>
                        <img className="img-thumbnail" src={Check} width="100%" />
                    </div>
                    <div className="img-container">
                        <p>Check Test2</p>
                        <img className="img-thumbnail" src={Check} width="100%" />
                    </div>
                </Carousel>
                <Stack spacing="extraLoose">
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <Stack vertical distribution="center">
                                <DisplayText size="small">
                                    Patient Organization
                                </DisplayText>
                                <Button>
                                    <Link to="/patient">Patient Org</Link>
                                </Button>
                            </Stack>
                        </div>

                    </Card>
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <Stack vertical distribution="center">
                                <DisplayText size="small">
                                    Base Organization
                                </DisplayText>
                                <Button>
                                    <Link to="/base">BaseOrg</Link>
                                </Button>
                            </Stack>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <Stack vertical distribution="center">
                                <DisplayText size="small">
                                    Donor Organization
                                </DisplayText>
                                <Button>
                                    <Link to="/donor">DonorOrg</Link>
                                </Button>
                            </Stack>
                        </div>
                    </Card>
                </Stack>
        </Stack>
    );
}

export default LandingPage;
