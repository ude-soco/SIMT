import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import RestAPI from "services/api";

import "d3-transition";

import { handleServerErrors } from "utils/errorHandler";

import "react-tabs/style/react-tabs.css";

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

class CloudChartPage extends Component {
  state = {
    mydata: [],
    wordArray: [],
    isModalLoader: false,
    isTweetData: false,
    isPaperData: false,
    isManualData: false,
    tweetIds: [],
    userPageIDs: [],
    isData: true,
    title: "",
    url: "",
    year: "",
    abstract: "",
    papercount: null,
    word: "",
    abstract: "",
    weight: "",
    original_keyword: "",
    original_keywords: [],
  };

  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.cloudChart()
        .then((response) => {
          let keywordArray = [];
          for (let i = 0; i < response.data.length; i++) {
            keywordArray.push({
              text: response.data[i].keyword,
              value: response.data[i].weight,
              tweet_ids: response.data[i].tweet_ids,
              papers: response.data[i].papers,
              source: response.data[i].source,
              original_keyword: response.data[i].original_keyword,
              original_keywords: response.data[i].original_keywords || [],
            });
          }
          if (response.data.length === 0) {
            this.setState({
              isData: false,
            });
          }
          this.setState({
            isLoding: false,
            wordArray: keywordArray,
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }
  

  

  render() {
    
    return (
      <Fragment>
        {this.state.isLoding ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : this.state.isData ? (
          <>
            <div style={{ height: "500px", width: "100%" }}>
              <ReactWordcloud
                options={options}
                words={this.state.wordArray}
              />
            </div>
          </>
        ) : (
          // <div id="chartdiv" style={{ width: "100%", height: "1000px" }}></div>
          <div style={{ textAlign: "center" }}>No Data Found</div>
        )}
       
      </Fragment>
    );
  }
}

export default CloudChartPage;
