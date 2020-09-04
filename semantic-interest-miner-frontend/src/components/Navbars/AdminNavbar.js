import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../helper/index";
import { getItem } from "utils/localStorage";
import { BASE_URL } from "../../constants";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import "./AdminNav.css";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

function getSuggestionValue(suggestion) {
  // debugger;
  return suggestion.first_name;
}

function renderSuggestion(suggestion) {
  // debugger;
  localStorage.setItem("userId", suggestion.id);
  return (
    <Link to={`/app/profile/${suggestion.id}`}>
      <div
        style={{ padding: "10px 20px" }}
      >{`${suggestion.first_name} ${suggestion.last_name}`}</div>
    </Link>
  );
}

class AdminNavbar extends React.Component {
  state = {
    query: "",
    results: [],
    suggestions: [],
    value: "",
  };

  getInfo = (v) => {
    const TOKEN = getItem("accessToken");
    axios({
      method: "get",
      url: `${BASE_URL}/api/accounts/user-search/${v}/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${TOKEN}`,
      },
    }).then(({ data }) => {
      this.setState({
        suggestions: data,
        popupVisible: !this.state.popupVisible,
      });
    });
  };

  _onBlur = () => {
    this.setState({
      value: "",
    });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.getInfo(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  //**END SUGGESTION *//
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for users..",
      value,
      onChange: this.onChange,
      onBlur: this._onBlur,
    };
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend"></InputGroupAddon>

                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                  />
                </InputGroup>
              </FormGroup>
            </Form>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <i className="fas fa-user-tie"></i>
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {getItem("name") ? getItem("name") : "User"}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/app/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem to="/" onClick={(e) => logout()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
