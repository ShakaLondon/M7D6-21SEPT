import React, { useState } from 'react';
import { Navbar, Container, NavDropdown, Nav, Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons'
import { withRouter, Redirect, useHistory } from 'react-router-dom';


function SearchJobs(props) {

  let history = useHistory()

    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit= (e) => {
        e.preventDefault();
        // return <Redirect to={`/Results?search=${searchQuery}`}/>
        history.push(`/Results?search=${searchQuery}`)
      }

      const handleChange= (e) => {
        // e.preventDefault();
        console.log(e.target.value)
        setSearchQuery(e.target.value);
      }

    
  return (
      <Container className="d-flex align-items-center" style={{height: "100%"}}>
        {/* <div> */}
            <Form onSubmit={handleSubmit} style={{width: "100%"}}>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Type in your ideal job here"
                    aria-label="Job Search Box"
                    aria-describedby="Job Search Box"
                    name="searchQuery"
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    />
                    <Button variant="outline-secondary" id="button-addon2" type="submit" >
                    Search Jobs
                    </Button>
                </InputGroup>
            </Form>
        {/* </div> */}
      </Container>
  );
}

export default withRouter(SearchJobs);