import React from "react";
import { Button, Carousel, Card , Navbar , Nav , Container, NavDropdown} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import './Navbar.css';
const Header = () => {
  return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="./">Cryptogrammer
      {/* <img
          alt=""
          src="./logo-color.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '} */}
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link className="header-link" as={Link} to="articles">Articles</Nav.Link>
        <Nav.Link className="header-link" as={Link} to="algorithms">Algorithms</Nav.Link>
      </Nav>
      {/* <Nav className="justify-content-end">
        <LeftTab user={user}/>
      </Nav> */}
    </Navbar.Collapse>
    </Container>
  </Navbar>
  <Outlet />
  </>
  );
};
export default Header;