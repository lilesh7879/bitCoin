import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

var coinValue = [];
var chartData = {
    labels: [],

    datasets: [],
};

export default function LineChart(props) {
    const [responses, setResponses] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        var startDate = "2013-09-01";
        var endDate = "2013-09-10";
        axios
            .get(
                `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${props.unit}&start=${startDate}&end=${endDate}`
            )
            .then((res) => {
                const responses = res.data;
                setResponses(responses);

                var values = Object.values(responses.bpi);
                var Key = Object.keys(responses.bpi);
                coinValue = values;
                setLabels(Key);
                setChartValues(chartData);
            });
    }, [props.unit]);
    return (
        <div key={props.unit}>
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "Bitcoin Value",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "#71C898",
                            pointBorderColor: "#71C898",
                            data: coinValue,
                        },
                    ],
                }}
                options={{
                    title: {
                        display: false,
                        text: "Bit Coin",
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: "right",
                    },
                    elements: {
                        line: {
                            tension: 0, // disables bezier curves
                        },
                    },
                }}
            />
        </div>
    );
}