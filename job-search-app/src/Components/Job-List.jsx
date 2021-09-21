import React, { useState, useEffect, setState } from 'react';
import { Navbar, Container, NavDropdown, Nav, Button, InputGroup, FormControl, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripHorizontal, faStar } from '@fortawesome/free-solid-svg-icons'
import { withRouter, Redirect, Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchResultsAction, addToFavAction, removeFromFavAction } from "../Redux/Actions/index";

const mapStateToProps = (state) => ({
    favouriteJobs: state.favourites.jobs,
    jobList: state.search.allJobs,
    searchRes: state.search.searchResults,
    error: state.search.error,
    loading: state.search.loading,
  });

  const mapDispatchToProps = (dispatch) => ({
    //functions
    fetchSearchResults: (query, searchType) => dispatch(fetchResultsAction(query, searchType)),
    addToFavList: (query) => dispatch(addToFavAction(query)),
    removeFromFavList: (query) => dispatch(removeFromFavAction(query)),
  });


const ResultList = ({
    favouriteJobs,
    jobList,
    searchRes,
    error,
    loading,
    location,
    fetchSearchResults,
    addToFavList,
    removeFromFavList,
}) => {
    
    let locationUrl = useLocation();

    console.log(locationUrl)

    // console.log(location.search)
    
    const params = new URLSearchParams(locationUrl.search);
    const searchReq = params.get('search');
    console.log(searchReq)



    // const [searchRequest, setSearchRequest] = useState(searchReq);
    // const [searchResult, setSearchResult] = useState([]);
    const roleSearch = "search"

    useEffect(() => {
        fetchSearchResults(searchReq, roleSearch)
    }, [searchReq])

    // const showCompanyJobs = (e) => {
    //     e.preventDefault();
    //     console.log(e.target.value)
    //     // return <Redirect to={`/Results?search=${searchQuery}`}/>
    //     props.history.push(`/Results?company=${e.target.value}`)
    //   }


  return (
      <Container fluid className="d-flex" style={{ height: "100%", width: "80vw", marginTop: "100px" }}>
        <Row style={{width: "100%"}}>
            <Col md={12} lg={12}>
            <h2 className="my-3 pl-4">{searchReq ? `Search Results for '${searchReq}'` : `Favourite Jobs`}</h2>
                <ListGroup>
                    
                    { searchReq ? (searchRes ? (
                        searchRes.map((job) => {

                            const jobHTML = job.description
                            const descripParent = `<div>${jobHTML}</div>`

                            return (
                            <ListGroup.Item className="border-0" key={job._id} >
                                    <Card style={{ width: '100%', height: '400px' }}>
                                        <Card.Body>
                                        <Card.Title style={{ fontSize: '25px' }} className="py-2 d-flex justify-content-between">
                                            <div className="d-flex">{job.title}</div>
                                            {favouriteJobs.includes(job) ? <div className="d-flex btn btn-light text-danger" onClick={()=> removeFromFavList(job)}>
                                                                                        <FontAwesomeIcon icon={faStar}/>
                                                                                    </div> :
                                                                                    <div className="d-flex btn btn-light" onClick={()=> addToFavList(job)}>
                                                                                        <FontAwesomeIcon icon={faStar}/>
                                                                                    </div>}
                                        </Card.Title>
                                        <Card.Subtitle>
                                            <Link className="py-3 my-4" to={`/Company?jobs=${job.company_name}`} >{job.company_name}</Link>
                                        </Card.Subtitle>
                                            <Card style={{ width: '100%' }} className="mt-4">
                                            <Card.Body className="overflow-auto">
                                                    <Card.Text dangerouslySetInnerHTML={{
                                                                __html: descripParent
                                                            }} style={{ height: '150px' }}>
                                                        
                                                    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    <Button variant="primary" className="my-3" href={job.url} >Apply Here</Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>)})) :
                            (<h2>There are no results for your search! Try again!</h2>)) :

                            (favouriteJobs.length !== 0 ? (
                                favouriteJobs.map((job) => {
        
                                    const jobHTML = job.description
                                    const descripParent = `<div>${jobHTML}</div>`
        
                                    return (
                                    <ListGroup.Item className="border-0" key={job._id} >
                                            <Card style={{ width: '100%', height: '400px' }}>
                                                <Card.Body>
                                                <Card.Title style={{ fontSize: '25px' }} className="py-2 d-flex justify-content-between">
                                                    <div className="d-flex">{job.title}</div>
                                                    {favouriteJobs.includes(job) ? <div className="d-flex btn btn-light text-danger" onClick={()=> removeFromFavList(job)}>
                                                                                        <FontAwesomeIcon icon={faStar}/>
                                                                                    </div> :
                                                                                    <div className="d-flex btn btn-light" onClick={()=> addToFavList(job)}>
                                                                                        <FontAwesomeIcon icon={faStar}/>
                                                                                    </div>}
                                                </Card.Title>
                                                <Card.Subtitle>
                                                    <Link className="py-3 my-4" to={`/Company?jobs=${job.company_name}`} >{job.company_name}</Link>
                                                </Card.Subtitle>
                                                    <Card style={{ width: '100%' }} className="mt-4">
                                                    <Card.Body className="overflow-auto">
                                                            <Card.Text dangerouslySetInnerHTML={{
                                                                        __html: descripParent
                                                                    }} style={{ height: '150px' }}>
                                                                
                                                            </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            <Button variant="primary" className="my-3" href={job.url} >Apply Here</Button>
                                            </Card.Body>
                                        </Card>
                                    </ListGroup.Item>)})) :
                                    (<h2>There are no jobs in your favourites! Click the star on a job and try again!</h2>))


                    }
                
                </ListGroup>
               
            </Col>
        </Row>
      </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);