import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@shopify/polaris/build/esm/styles.css";
import { Carousel } from "react-responsive-carousel";
import Check1 from "./check1.png";
import Check2 from "./check2.png";

import "../App.css";
import { Stack, Button, DisplayText, Card } from "@shopify/polaris";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function LandingPage() {
  return (
    <>
    <div style={{ padding: "20px",height:"100vh" }}>
      <Stack spacing="extraLoose" vertical alignment="center">
        <Carousel
          autoPlay
          interval={6000}
          infiniteLoop
          showArrows={false}
          showStatus={false}
          showIndicators={false}
        >
          <div className="img-container">
            <img className="img-thumbnail" src={Check1} width="100%" />
          </div>
          <div className="img-container">
            <img className="img-thumbnail" src={Check2} width="100%" />
          </div>
        </Carousel>
        <Stack spacing="extraLoose">
          <Card>
            <div style={{ padding: "30px" }}>
              <Stack vertical alignment="center">
                <DisplayText size="small">Patient Organization</DisplayText>
                <div style={{ paddingTop: "10px" }}>
                  <Button primary>
                    <Link to="/patient">Patient Org</Link>
                  </Button>
                </div>
              </Stack>
            </div>
          </Card>
          <Card>
            <div style={{ padding: "30px" }}>
              <Stack vertical alignment="center">
                <DisplayText size="small">Base Organization</DisplayText>
                <div style={{ paddingTop: "10px" }}>
                  <Button primary>
                    <Link to="/base">BaseOrg</Link>
                  </Button>
                </div>
              </Stack>
            </div>
          </Card>
          <Card>
            <div style={{ padding: "30px" }}>
              <Stack vertical alignment="center">
                <DisplayText size="small">Donor Organization</DisplayText>
                <div style={{ paddingTop: "10px" }}>
                  <Button primary>
                    <Link to="/donor">DonorOrg</Link>
                  </Button>
                </div>
              </Stack>
            </div>
          </Card>
        </Stack>
      </Stack>
    </div>
     <p className="footer">A Project By Saivamsi</p>
     </>
  );
}

export default LandingPage;
