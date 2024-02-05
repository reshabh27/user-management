import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useGlobalContext } from "../context";


const NavbarComponent = () => {
  const { state, dispatch } = useGlobalContext(); // Use the context

  const user = state.loggedUser;
    // console.log(user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Dispatch logout action to update the state
    dispatch({ type: "LOGOUT_USER" });
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          User management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            { state.canDelete ?
            <Nav.Link as={Link} to="/adduser">
              Add User
            </Nav.Link> : ""
            }
          </Nav>
        </Navbar.Collapse>

        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <Dropdown className="ps-3">
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <Image
                  alt="Profile"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  width={30}
                  height={30}
                  roundedCircle
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Logged in as {user?.fullname}</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button as={Link} className="light-green-button" to="/login">
              Login
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
