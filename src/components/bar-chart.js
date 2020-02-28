import React from "react"
//import cardData from "../data/data.json"
import { scaleLinear, scaleBand } from "d3-scale"
// import chartStyles from "./bar-chart.module.css"
const chartWidth = 150,
      chartHeight = 150,
      padding = 20;

const xScale = scaleBand()
    .domain(["q1", "q2", "q3", "q4", "q5"])
    .range([0, chartWidth - padding])
    .padding(0);

const yScale = scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight - padding]);

const dataset = [{x:"q1", y:10},
                 {x:"q2", y:25},
                 {x:"q3", y:50},
                 {x:"q4", y:60},
                 {x:"q5", y:100}];

const Axis = (direction) => {
    if(direction === "x") {
        return (
            <path
                d={[
                    "M", 0, chartHeight - padding,
                    "H", chartWidth
                    ].join(" ")}
                stroke="#000"
            />
        )
    }
    else if(direction === "y") {
        return (
            <path
                d={[
                    "M", 0, 0,
                    "V", chartHeight - padding
                ].join(" ")}
                stroke="#000"
            />
        )
    }
}

function BarChart() {
    const bars = dataset.map((d, i) =>
          <rect
            className="bar"
            x={xScale(d.x)}
            y={chartHeight - padding - yScale(d.y)}
            height={yScale(d.y)}
            width={xScale.bandwidth()}
          />
    );

    const xAxis = Axis("x");
    const yAxis = Axis("y");

    return (
        <svg width="150" height="150" viewbox="0 0 100 100">
            {bars}
            {xAxis}
            {yAxis}
        </svg>
    )
}

export default BarChart