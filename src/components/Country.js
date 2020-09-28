import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import axios from '../axios'
import '../App.scss'

export default class Countries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Countries: [],
            CountryDetails: [],
            CountryData : [],
            param: null,
        };
    }

    getCountryData = () => {

        var font_color = this.props.color

        this.setState({ properties : { backgroundColor: this.props.color+"3F", color: font_color } });
       
        axios
            .get(`/region/${this.props.country}`, {})
            .then(res => {
                const data = res.data
                const countries = data.map((u,i) =>
                    <button id={i} key={i} className="country" style={this.state.properties} value={u.name} onClick={(e) => this.getCountryDetails(i, e.target.value)} onBlur={(e) => this.resetStyle(i, e.target.value)} >{u.name}<img className="flag" src={u.flag} alt="" /></button>
                )
                this.setState({ countries })

            })
            .catch((error) => {
                console.log(error)
            })

    }

    resetStyle = (id, e) => {
        document.getElementById(id).style.backgroundColor = this.props.color+"4F";
        document.getElementById(id).style.color = this.props.color
    }

    getCountryDetails = (id, e) => {
        document.getElementById(id).style.backgroundColor = this.props.color+"AF";
        document.getElementById(id).style.color = "#FFFFFF"
        
        var i = this.state.CountryData.length, api_call = true

        while(i--) {
            if(e === this.state.CountryData[i].name) {
                const data = this.state.CountryData[i];
                this.state.CountryDetails = []
                this.setState({
                    CountryDetails : this.state.CountryDetails.concat(data)
                  })
                api_call = false
                break;
            }
        }
        
        if (api_call === true){
        axios
            .get(`name/${e}?fullText=true`, {})
            .then(res => {
                const data = res.data
                this.setState({
                    CountryData : this.state.CountryData.concat(data)
                  })
                this.setState({ CountryDetails : data })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
    

    componentDidMount() {
        this.getCountryData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.country !== this.props.country) {
            this.getCountryData()
        }
    }

    render() {

        let Details;
        if (this.state.CountryDetails !== null) {
            Details = this.state.CountryDetails;
        } 
        else {
            Details = null;
        }

        return (

            <Col md={9}>
                <Row>
                    <Col md={5}>
                        <Row>
                            <h6>Select a country</h6>
                        </Row>
                        <Row>
                            {this.state.countries}
                        </Row>
                    </Col>
                    <Col md={7}>
                    {Details.map((u,i) =>
                    <div >
                        <button key={i} className="country-details">{u.region}/ {u.name}</button>
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src={u.flag} fluid />
                            </Col>
                            <Col xs={6} md={4}>
                                <Row>
                                    <h5>{u.name}</h5>
                                </Row>
                                <Row>
                                    <p>{u.capital}</p>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Demonym</Card.Subtitle>
                                        <Card.Text>
                                            {u.demonym}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Calling Code</Card.Subtitle>
                                        <Card.Text>
                                            {u.callingCodes}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Currency</Card.Subtitle>
                                        <Card.Text>
                                            {u.currencies[0]['symbol']} {u.currencies[0]['name']}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Population</Card.Subtitle>
                                        <Card.Text>
                                            {u.population}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
                    </Col>
                </Row>
            </Col>

        )
    }
}
