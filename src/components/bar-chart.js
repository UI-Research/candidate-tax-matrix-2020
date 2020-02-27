import React from "react"
import cardData from "../data/data.json"
import { scaleLinear, scaleBand } from "d3-scale"
// import chartStyles from "./bar-chart.module.css"
const chartWidth = 150,
      chartHeight = 150;

const xScale = scaleBand()
    .domain(["q1", "q2", "q3", "q4", "q5"])
    .range([0, chartWidth])
    .padding(0);

const yScale = scaleLinear()
    .domain([0, 100])
    .range([0, chartHeight]);

const dataset = [{x:"q1", y:10},
                 {x:"q2", y:25},
                 {x:"q3", y:50},
                 {x:"q4", y:60},
                 {x:"q5", y:100}];

function BarChart() {
    const bars = dataset.map((d, i) =>
          <rect
            className="bar"
            x={xScale(d.x)}
            y={chartHeight - yScale(d.y)}
            height={yScale(d.y)}
            width={xScale.bandwidth()}
          />
    );

    return (
        <svg width="150" height="150" viewbox="0 0 100 50">
            {bars}
        </svg>
    )
}

export default BarChart