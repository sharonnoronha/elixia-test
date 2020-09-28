import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Countries from './Country';

class Regions extends Component{

    constructor(props) {
        super(props);
        this.state = {  
            param : null,       
            color : null
        };
    
      }

    handleClick = (e,style) =>
    {
        const rgbHex = require('rgb-hex');
        this.setState({param : e})
        var str = style.substr(4)
        var rgb = str.substr(0, str.length - 1)
        var hex = "#"+rgbHex(rgb)
        this.setState({color : hex})
        
    }

    render(){

        const param = this.state.param;
        let Country,bgcolor;
        if (param) {
            Country = this.state.param;
            bgcolor = this.state.color;

        } else {
            Country = null;
        }
    

        return(
            <Container className="container">
                <Row>
                    <Col md={3}>
                        <Row>      
                            <h6>
                                Select a region
                            </h6>   
                        </Row>
                        <Row>  
                            <button className="region" value="africa"  style={{backgroundColor:"#9ACD32"}} onClick={(e) => this.handleClick(e.target.value, e.target.style.backgroundColor)}>
                                Africa
                            </button>
                        </Row>
                        <Row>  
                            <button className="region" value="asia" style={{backgroundColor:'#DAA520'}} onClick={(e) => this.handleClick(e.target.value, e.target.style.backgroundColor)}>
                                Asia
                            </button>
                        </Row>
                        <Row>  
                            <button className="region" value="americas" style={{backgroundColor:'#FF8C00'}} onClick={(e) => this.handleClick(e.target.value, e.target.style.backgroundColor)}>
                                America
                            </button>
                        </Row>
                        <Row>  
                            <button className="region" value="europe" style={{backgroundColor:'#DC143C'}} onClick={(e) => this.handleClick(e.target.value, e.target.style.backgroundColor)}>
                                Europe
                            </button>
                        </Row>
                        <Row>  
                            <button className="region" value="oceania" style={{backgroundColor:'#FA8072'}} onClick={(e) => this.handleClick(e.target.value, e.target.style.backgroundColor)}>
                                Oceania
                            </button>
                        </Row>
                    </Col>
                    { Country != null ? <Countries country = {Country} color= {bgcolor}/> : console.log("No region selected") }
                </Row>
            </Container>
        )
    }
}

export default Regions;