import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import axios from 'axios';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class GraphLog extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
    this.state = {
      xCoord : 0,
      yCoord : 15,
      humidityValue : [],
      updateInterval : 5000,
      time: '',
    }
	}
  componentWillMount() {
    this.setState({
      time: Date.now(),
      humidityValue : [],
    })
  }
	componentDidMount() {
		setInterval(this.updateChart, this.state.updateInterval);
	}
	updateChart() {
    let ID = this.state.time;
    axios.post(`http://localhost:3001/getTraceData/`+ID)
    .then(response => {
      const xCoord = this.state.xCoord + 1;
      this.state.yCoord = response.data.soilTraceDetails;
      this.state.humidityValue.push({x: xCoord,y: this.state.yCoord});
      if (this.state.humidityValue.length >  10 ) {
  			this.state.humidityValue.shift();
  		}
      this.setState({
        xCoord : xCoord
      })
    })
    .catch(error => this.setState({ error, isLoading: false }));
		this.chart.render();
	}
	render() {
		const options = {
      animationEnabled: true,
			exportEnabled: true,
			theme: "dark1", // "light1", "dark1", "dark2"
			title:{
				text: "Soil Humidity over Time"
			},
			axisY: {
				title: "humidity_level",
				includeZero: false,
				suffix: "gm"
			},
			axisX: {
				title: "Time (5s)",
				prefix: "",
				interval: 1
			},
			data: [{
				type: "line",
				dataPoints : this.state.humidityValue
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
}
export default GraphLog;
