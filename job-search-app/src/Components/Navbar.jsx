import React, { useState } from 'react';
import { Navbar, Container, NavDropdown, Nav, Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons'
import { withRouter, Redirect, Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchResultsAction, addToFavAction, removeFromFavAction, setUsernameAction } from "../Redux/Actions/index";

const mapStateToProps = (state) => ({
  favouriteJobs: state.favourites.jobs,
  jobList: state.search.allJobs,
  userName: state.user.firstName,
  searchRes: state.search.searchResults,
  error: state.search.error,
  loading: state.search.loading,
});

const mapDispatchToProps = (dispatch) => ({
  //functions
  fetchSearchResults: (query, searchType) => dispatch(fetchResultsAction(query, searchType)),
  addToFavList: (query) => dispatch(addToFavAction(query)),
  removeFromFavList: (query) => dispatch(removeFromFavAction(query)),
  setUser: (query) => dispatch(setUsernameAction(query)),
});


const NavJobs = ({
  favouriteJobs,
  userName,
  jobList,
  searchRes,
  error,
  loading,
  location,
  fetchSearchResults,
  addToFavList,
  removeFromFavList,
}) => {

  const [openNav, setOpenNav] = useState(false);

  return (
    <Navbar bg="light" expand="lg" className="fixed-top d-block">
      <Container fluid className="mx-0 d-flex justify-content-between px-0" style={{ width: "100%" }}>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-0 d-inline-flex">
            <Link to="/Search" className="text-dark font-weight-bold px-3">Search</Link>
            <Link to="/Company" className="text-dark font-weight-bold px-3">Jobs</Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="text-dark font-weight-bold">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="ml-auto mr-0 d-inline-flex align-items-center">
            <Link className="text-dark font-weight-bold px-3" to="/Favourites">Favourites</Link>
            {/* <Nav.Link href="#link" className="text-dark font-weight-bold">Images</Nav.Link> */}
            <Nav.Link href="#link" className="text-dark font-weight-bold px-3"><FontAwesomeIcon icon={faGripHorizontal}/></Nav.Link>
            <Nav.Link href="#link" className="text-dark font-weight-bold px-3" onClick={() => setOpenNav(!openNav)}>
              {userName !== '' ? <Button className="btn btn-primary btn-circle btn-md">{userName.charAt(0)}</Button> : <img src="http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png" className="btn-circle btn-md bg-dark"/> }
              </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      { openNav ? <Container fluid className="mx-0 d-flex justify-content-between px-0 mb-1 mt-3">
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="ml-0 d-inline-flex">
            <Link to="/Search" className="text-dark font-weight-bold px-3">Search</Link>
            <Link to="/Company" className="text-dark font-weight-bold px-3">Jobs</Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="text-dark font-weight-bold">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          {/* </Nav> */}
          <Nav className="ml-auto mr-0 d-inline-flex align-items-center">
          { userName != '' ? 
          <div className="d-flex align-items-center">
            <h5 className="mb-0">{`You are logged in as `}</h5>
            <h6 className="text-bold text-underline">{userName?.toUpperCase()}</h6>
            <Button variant="outline-secondary">Log Out</Button>
          </div>
          : <InputGroup>
            <FormControl
              placeholder="Username"
              aria-label="Recipient's username with two button addons"
              className="border-right-0"
              
            />
            <Button variant="outline-secondary rounded-0">Log In</Button>
            <Button variant="outline-secondary btn-end border-left-0">Sign Up</Button>
          </InputGroup> }
            {/* <Nav.Link href="#link" className="text-dark font-weight-bold">Images</Nav.Link> */}

            {/* <Nav.Link href="#link" className="text-dark font-weight-bold pl-3">
              <Button className="btn btn-primary px-3 mx-2">Log In</Button>
              <Button className="btn btn-primary px-3 mx-2">Sign Up</Button>
              </Nav.Link> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container> : null}
    </Navbar>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavJobs);