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
  
  
const CompanyJobs = ({
    favouriteJobs,
    jobList,
    searchRes,
    error,
    loading,
    fetchSearchResults,
    addToFavList,
    removeFromFavList,
}) => {

    let locationUrl = useLocation();

    console.log(locationUrl)

    // console.log(props.location.search)
    // const searchQ = props.location.search;
    const params = new URLSearchParams(locationUrl.search);
    const searchReq = params.get('jobs');
    console.log(searchReq)

    // const [searchRequest, setSearchRequest] = useState(searchReq);
    // const [searchResult, setSearchResult] = useState([]);
    // const [searchCompanyJobs, setSearchCompanyJobs] = useState(null);

    // NORMAL FETCH
    // useEffect(() => {
    //     const url = searchReq ? `https://strive-jobs-api.herokuapp.com/jobs?company=${searchRequest}` : `https://strive-jobs-api.herokuapp.com/jobs?limit=10&skip=10 `
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGIwZGZiYmRjMTQ1ODAwMTVlNGFlZTUiLCJpYXQiOjE2MzE3NzI3MTIsImV4cCI6MTYzMjk4MjMxMn0.2YWhQrKLUrKnO_spK_yPMr-orqdslBjHVr-zMEUyYPk'
    //         }
    //     }
    //     fetch(`${url}`, options)
    //     .then(res => res.json())
    //     .then((jobs) => {
    //         console.log(jobs.data)
    //         setSearchResult(jobs.data)
    //         console.log(searchResult)
    //     })
    //     .catch((error) => {console.log(error)})
    // }, [])

    // const showCompanyJobs = (e) => {
    //     e.preventDefault();
    //     console.log(e.target.value)
    //     // return <Redirect to={`/Results?search=${searchQuery}`}/>
    //     props.history.push(`/Results?company=${e.target.value}`)
    //   }

    const roleSearch = searchReq ? "company" : "limit=10&"

    const searchReqQuery = searchReq ? searchReq : "skip=10" 



    useEffect(() => {
        fetchSearchResults(searchReqQuery, roleSearch)
    }, [])


  return (
      <Container fluid className="d-flex" style={{ height: "100%", width: "80vw", marginTop: "100px" }}>
        <Row style={{width: "100%"}}>
            <Col md={12} lg={12}>
                <h2 className="my-3 pl-4">{searchReq ? `Search Results for company: '${searchReq}'` : `Current Vacancies`}</h2>
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
                                        <Link className="py-3 my-3" to={`/Company?jobs=${job.company_name}`} >{job.company_name}</Link>
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

                            jobList ? (
                                jobList.map((job) => {
        
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
                                                <Link className="py-3 my-3" to={`/Company?jobs=${job.company_name}`} >{job.company_name}</Link>
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
                                    (<h2>There are no results for your search! Try again!</h2>)
                    }
                
                </ListGroup>
               
            </Col>
        </Row>
      </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobs);