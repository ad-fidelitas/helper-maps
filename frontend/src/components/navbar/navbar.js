import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Col, FormInline, Button, NavbarBrand, NavbarToggler, Navbar, Collapse, NavbarNav, NavItem, NavLink } from "mdbreact";

class Navibar extends Component {
  state = {
    collapsed: false
  }

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleNavbarClick = () => {
    this.setState({
      collapsed: false
    });
  }

  render() {
    return (
      <Col md="12">
        <Navbar
          color="deep-purple"
          className="text-white darken-3"
          dark
          expand="md"
        >
          <NavbarBrand>Navbar</NavbarBrand>
          <NavbarToggler onClick={this.handleTogglerClick} />
          <Router>
          <Collapse isOpen={this.state.collapsed} navbar>
            <NavbarNav right onClick={this.handleNavbarClick}>
              <FormInline className="md-form mr-auto m-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button
                  outline
                  color="white"
                  size="sm"
                  type="submit"
                  className="mr-auto"
                >
                  Search
                </Button>
              </FormInline>
            </NavbarNav>
          </Collapse>
          </Router>
        </Navbar>
      </Col>
    );
  }
}

export default Navibar;