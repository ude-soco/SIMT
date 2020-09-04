import React from "react";
import Chart from "chart.js";
import CloudChart from "../components/Chart/CloudChart";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import Header from "components/Headers/Header.js";
import "../assets/scss/custom.css";

class CloudChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      tooltipOpen: false,
      imageTooltipOpen: false,
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  
  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default1 shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div
                      className="col"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h2 className="text-white1 mb-0">Interest Overview</h2>
                        <p>
                          This word cloud shows the top 15 interests based on
                          your published paper/tweets.
                     
                        </p>
                      </div>
                      
                    </div>
                  </Row>
                </CardHeader>

                <CardBody>
                  <CloudChart />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CloudChartPage;
