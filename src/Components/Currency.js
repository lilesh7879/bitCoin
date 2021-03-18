import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from './LineChart';

export default class Currency extends Component {


    state = {
        options: [
            {
                value: 'Select…',
                name: null,
            },
            {
                value: 'USD',
                name: 'United States Dollar',
            },
            {
                value: 'GBP',
                name: 'British Pound Sterling ',
            },
            {
                value: 'EUR',
                name: 'Euro',
            },
        ],
        value: 'USD',
        allUnits: [],

        code: '',
        symbol: '',
        rate: '',
        description: ''

    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.setState({ code: this.state.allUnits[event.target.value].code })
        this.setState({ symbol: this.state.allUnits[event.target.value].symbol })
        this.setState({ rate: this.state.allUnits[event.target.value].rate })
        this.setState({ description: this.state.allUnits[event.target.value].description })
    };

    componentDidMount() {
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
            .then(res => {
                const responses = res.data;
                this.setState({ responses });
                this.setState({ allUnits: responses.bpi });
            })
    }

    render() {



        const { options, value } = this.state;
        return (

            <div style={{ padding: "20px" }}>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <h5>1 Bitcoin Equals</h5>
                            <br />
                            <select onChange={this.handleChange} value={value}>
                                {options.map(item => (
                                    <option key={item.value} value={item.value}>
                                        {item.name}
                                    </option>
                                ))}


                            </select>
                            <br />
                            <br />
                            <h4>{this.state.rate} {this.state.description}</h4>
                            <h4></h4>
                            {/* <h2>{this.state.units.code}</h2> */}
                        </Col>
                        <Col xs={8}>
                            <LineChart unit={this.state.value} />
                        </Col>
                    </Row>
                </Container>

            </div >
        )
    }
}
