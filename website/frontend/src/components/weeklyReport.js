import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import axios from 'axios';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class WeeklyReport extends Component {
	constructor() {
		super();
		// window.location.reload(false);
	}
	render() {
		const options = {
      animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Average Soil Humidity per day in a week"
			},
			axisY: {
				title: "humidity_level",
				includeZero: false,
				suffix: "gm"
			},
			axisX: {
				title: "Day",
				prefix: "D",
        interval : 1,
			},
			data: [{
				type: "column",
				dataPoints : [{x: 1, y: 10},
                      {x: 2, y: 18},
                      {x: 3, y: 20},
                      {x: 4, y: 16},
                      {x: 5, y: 10},
                      {x: 6, y: 13},
                      {x: 7, y: 15},]
			}]
		}

		const options1 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Average soil humidity during morning, noon, evening and night"
			},
			axisY: {
				title: "humidity_level",
				includeZero: false,
				suffix: "gm"
			},
			axisX: {
				title: "Day",
				prefix: "D",
        interval : 1,
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints : [{y: 13, label: "Morning"},
                      {y: 2, label: "Noon"},
                      {y: 23, label: "Evening"},
                      {y: 30, label: "Night"}]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.report = ref}
			/>
			<CanvasJSChart options = {options1}
				 onRef={ref => this.report = ref}
			/>

		</div>
		);
	}
}
export default WeeklyReport;
