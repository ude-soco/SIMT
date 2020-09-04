import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { handleServerErrors } from "utils/errorHandler";
import user from "../services/api";

class Profile extends React.Component {
  state = {
    data: [],
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    twitter_account_id: "",
    author_id: "",
    paper_count: "",
    tweet_count: "",
    keyword_count: "",
    isLoding: false,
  };
  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      user
        .getUserData()
        .then((response) => {
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
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }

  refreshData = () => {
    this.setState({ isLoding1: true }, () => {
      user
        .refreshData()
        .then((response) => {
          toast.success("New data will be available in a few minutes!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        })
        .catch((error) => {
          this.setState({ isLoding1: false });
          handleServerErrors(error, toast.error);
        });
    });
  };

  handleChange = (e) => {
    let getValue = e.target.value;
    let getName = e.target.name;
    this.setState(() => ({ [getName]: getValue }));
  };

  _handleSubmit = (e) => {
    const {
      id,
      email,
      first_name,
      last_name,
      twitter_account_id,
      author_id,
    } = this.state;
    e.preventDefault();
    let data = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      twitter_account_id: twitter_account_id,
      author_id: author_id,
    };

    this.setState({ isLoding: true }, () => {
      user
        .updateUserProfile(data, id)
        .then((response) => {
          toast.success("Update Profile Data !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          this.setState({ isLoding: false });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  };

  render() {
    const {
      email,
      first_name,
      last_name,
      twitter_account_id,
      author_id,
      paper_count,
      tweet_count,
      keyword_count,
    } = this.state;
    return (
      <>
        <UserHeader />
        {/* Page content */}

        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">
                            {this.state.data && paper_count}
                          </span>
                          <span className="description">Papers</span>
                        </div>

                        {/* <div>
                          <span className="heading">
                            {this.state.data && keyword_count}
                          </span>
                          <span className="description">Keywords</span>
                        </div> */}
                        <div>
                          <span className="heading">
                            {this.state.data && tweet_count}
                          </span>
                          <span className="description">Tweet Count</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>{this.state.data && first_name + " " + last_name}</h3>

                    <hr className="my-4" />
                    <div>
                      <Button color="info" onClick={this.refreshData}>
                        Refresh Account Data
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {this.state.isLoding ? (
                    <div className="text-center" style={{ padding: "20px" }}>
                      <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                      />
                    </div>
                  ) : (
                    <>
                      <Form onSubmit={this._handleSubmit} method="post">
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  First name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-first-name"
                                  name="first_name"
                                  value={first_name}
                                  onChange={this.handleChange}
                                  placeholder="First name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Last name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-last-name"
                                  name="last_name"
                                  value={last_name}
                                  onChange={this.handleChange}
                                  placeholder="Last name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-email"
                                >
                                  Email address
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-email"
                                  name="email"
                                  value={email}
                                  onChange={this.handleChange}
                                  placeholder="jesse@example.com"
                                  type="email"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                          Source information
                        </h6>
                        <div className="pl-lg-4">
                          <Row></Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  Semantic Scholar Id
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-city"
                                  name="author_id"
                                  value={author_id}
                                  onChange={this.handleChange}
                                  placeholder="Semantic Scholar Id"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Twitter Id
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-country"
                                  name="twitter_account_id"
                                  value={twitter_account_id}
                                  onChange={this.handleChange}
                                  placeholder="Twitter Acount id"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        <Button color="info" type="submit">
                          Edit profile
                        </Button>
                      </Form>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
