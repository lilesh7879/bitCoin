import React from 'react'
import { Line } from 'react-chartjs-2';
import axios from 'axios';


var coinValue = [];
var chartData = {
    labels: [],

    datasets: []
}

export default class lineChart extends React.Component {
    state = {
        responses: [],
        units: [],
        chartValues: [],
        labels: []

    }



    renderChart() {

    }
    componentWillMount() {
        var startDate = '2013-09-01';
        var endDate = '2013-09-10';
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.props.unit}&start=${startDate}&end=${endDate}`)
            .then(res => {
                const responses = res.data;
                this.setState({ responses });

                var values = Object.values(responses.bpi);
                var Key = Object.keys(responses.bpi);
                coinValue = values
                console.log("componentWillMount")
                this.setState({ labels: Key })
                this.setState({ chartValues: chartData });
            })
    }
    render() {
        console.log(this.props.unit);
        return (
            <div key={this.props.unit}>
                <Line
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                label: "Bitcoin Value",
                                fill: true,
                                lineTension: 0,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "#71C898",
                                pointBorderColor: "#71C898",
                                data: coinValue,
                            }],
                    }}
                    options={{
                        title: {
                            display: false,
                            text: 'Bit Coin',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        elements: {
                            line: {
                                tension: 0 // disables bezier curves
                            }
                        }
                    }}
                />

            </div>
        );
    }
}
