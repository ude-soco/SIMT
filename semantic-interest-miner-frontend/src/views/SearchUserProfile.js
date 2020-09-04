import React from "react";

// reactstrap components
import {Container} from "reactstrap";
// core components
import SearchUserHeader from "components/Headers/SearchUserHeader.js";
import { toast } from "react-toastify";

import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../services/api";
import "d3-transition";
import ComparisonSlider from "../views/ComparisonSlider.js";
import "react-tabs/style/react-tabs.css";
import "../assets/scss/custom.css";
import { setItem } from "utils/localStorage";




class SearchUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      twitter_account_id: "",
      author_id: "",
      score: "",
      isLoding: false,
      isLoding1: false,
      series1: [],
      data: [],
      series: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.getScore(this.props.match.params.id)
        .then((response) => {
          this.setState({
            score: response.data.score,
            venn_chart_data: response.data.venn_chart_data,
            barchart: response.data.bar_chart_data,
            HeatMap: response.data.heat_map_data,
          });
        })
        .catch((error) => {
          this.setState({ isLoding1: false });
          handleServerErrors(error, toast.error);
        });
      RestAPI.getUserProfile(this.props.match.params.id)
        .then((response) => {
          this.setState({
            id: response.data.id,
            first_name: response.data.first_name,
            email: response.data.email,
            last_name: response.data.last_name,
            twitter_account_id: response.data.twitter_account_id,
            author_id: response.data.author_id,
            paper_count: response.data.paper_count,
            tweet_count: response.data.tweet_count,
            keyword_count: response.data.keyword_count,
            paramid: this.props.match.params.id,
          });
        })
        .catch((error) => {
          handleServerErrors(error, toast.error);
        });
      this.setState({ isLoding: false });
    });
  }

  componentDidUpdate(prevPro) {
    if (prevPro.match.params.id !== this.props.match.params.id) {
      this.setState({ isLoding: true }, () => {
        RestAPI.getUserProfile(this.props.match.params.id)
          .then((response) => {
            setItem("userId", response.data.id);
            window.location.reload();
            this.setState({
              isLoding: false,
              id: response.data.id,
              first_name: response.data.first_name,
              email: response.data.email,
              last_name: response.data.last_name,
              twitter_account_id: response.data.twitter_account_id,
              author_id: response.data.author_id,
              paper_count: response.data.paper_count,
              tweet_count: response.data.tweet_count,
              keyword_count: response.data.keyword_count,
              paramid: this.props.match.params.id,
              radarChartData: {},
            });
          })
          .catch((error) => {
            this.setState({ isLoding: false });
            handleServerErrors(error, toast.error);
          });
      });
    }
  }






  render() {
    return (
      <>
        <SearchUserHeader
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          score={this.state.score}
        />

        <Container className="mt--7" fluid>
                 
          <ComparisonSlider
            first_name={this.state.first_name}
            last_name={this.state.last_name}
          />
        </Container>
      </>
    );
  }
}

export default SearchUserProfile;
