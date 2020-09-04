import React from "react";

// reactstrap components
import { Card, Row, Col, CardHeader } from "reactstrap";
// core components
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import Carousel from "react-bootstrap/Carousel";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";
import CloudChart from "../components/Chart/CloudChart";
import { getItem } from "utils/localStorage";
import "d3-transition";

import "react-tabs/style/react-tabs.css";
import "../assets/scss/custom.css";

import ReactWordcloud from "react-wordcloud";
/* Chart code */
// Themes begin
// Themes end
const options = {
  colors: ["#aab5f0", "#99ccee", "#a0ddff", "#00ccff", "#00ccff", "#90c5f0"],
  enableTooltip: false,
  deterministic: true,
  fontFamily: "arial",
  fontSizes: [15, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 3,
  rotations: 1,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

class ComparisonSlider extends React.Component {
  state = {
    data: [],
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    twitter_account_id: "",
    author_id: "",
    papercount: null,
    paper_count: "",
    tweet_count: "",
    keyword_count: "",
    word: "",
    score: "",
    isLoding: false,
    original_keyword: "",
    mydata: [],
    wordArray: [],
    isModalLoader: false,
    isTweetData: false,
    isPaperData: false,
    tweetIds: [],
    userPageIDs: [],
    isData: true,
    Loader: false,
  };

  componentDidMount() {
    this.setState({ isLoding: true, Loader: true }, () => {
      
      RestAPI.cloudChartUser()
        .then((response) => {
          let keywordArray = [];
          for (let i = 0; i < response.data.length; i++) {
            keywordArray.push({
              text: response.data[i].keyword,
              value: response.data[i].weight,
              tweet_ids: response.data[i].tweet_ids,
              papers: response.data[i].papers,
              papercount: response.data[i].papers.length,
              source: response.data[i].source,
              original_keyword: response.data[i].original_keyword,
            });
          }
          if (response.data.length === 0) {
            this.setState({
              isData: false,
            });
          }
          this.setState({
            wordArray: keywordArray,
            Loader: false,
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }

  
  

  render() {
    const { first_name, last_name } = this.props;
    return (
      <Card className="card-profile shadow" style={{ padding: "15px" }}>
        <Row>
          <CardHeader className="bg-white border-0">
            <Col xs="12">
              <h3 className = "mb-0">Comparison</h3>
            </Col>
          </CardHeader>
        </Row>
        {this.state.Loader ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" lg="12">
                <h1 style={{ color: "#076ec6", textAlign: "center" }}>
                  {first_name + " " + last_name}
                </h1>
              </Col>
            </Row>
            <Carousel
              interval={1000000000}
              indicators={false}
              style={{
                background: "rgba(255, 255, 255, 1)",
                borderRadius: "6px",
                overflow: "hidden",
                padding: "10px",
              }}
            >

              <Carousel.Item>
                <Row>
                  <Col
                    className="order-xl-2 mb-5 mb-xl-0"
                    lg="12"
                    style={{ overflow: "hidden" }}
                  >
                    <div>
                      <CloudChart />
                    </div>
                  </Col>

                  <Col
                    className="order-xl-2 mb-5 mb-xl-0"
                    lg="12"
                    style={{ overflow: "hidden" }}
                  >
                    <h1 className="second-user">
                      {getItem("name") + " " + getItem("lastname")}
                    </h1>
                    <div>
                      <div style={{ height: "500px", width: "100%" }}>
                        <ReactWordcloud
                          options={options}
                          words={this.state.wordArray}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                
              </Carousel.Item>
              

            </Carousel>
          </>
        )}
      </Card>
    );
  }
}

export default ComparisonSlider;
