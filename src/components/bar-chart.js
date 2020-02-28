import React from "react"
//import cardData from "../data/data.json"
import { scaleLinear, scaleBand } from "d3-scale"
// import chartStyles from "./bar-chart.module.css"
const chartWidth = 150,
      chartHeight = 150,
      padding = 20;

const xScale = scaleBand()
    .domain(["q1", "q2", "q3", "q4", "q5"])
    .range([padding, chartWidth])
    .padding(0);

const yScale = scaleLinear()
    .domain([0, 100])
    .range([chartHeight - padding, 0]);

const dataset = [{x:"q1", y:10},
                 {x:"q2", y:25},
                 {x:"q3", y:50},
                 {x:"q4", y:60},
                 {x:"q5", y:100}];

const Axis = (direction) => {
    if(direction === "x") {
        return (
            <g className="axis x">
                <path
                    d={[
                        "M", padding, chartHeight - padding,
                        "H", chartWidth
                        ].join(" ")}
                    stroke="#000"
                />
                <text x={chartWidth / 2} y={chartHeight} fill="#000">Income</text>
            </g>
        )
    }
    else if(direction === "y") {
        const ticks = yScale.ticks().map(value => ({
                    value,
                    yOffset: yScale(value)
            }));
console.log(ticks);
        return (
            <g className="axis y">
                <path
                    d={[
                        "M", padding, 0,
                        "V", chartHeight - padding
                    ].join(" ")}
                    stroke="#000"
                />
                {ticks.map(({value, yOffset}) => (
                    <g key={value} transform={`translate(0, ${yOffset})`} className="tick">
                        <line
                            x1="14"
                            x2={padding}
                            stroke="#000"
                        />
                        <line
                            x1={padding}
                            x2={chartWidth}
                            stroke="#d2d2d2"
                        />
                        <text
                            key={value}
                            style={{
                                fontSize: "10px",
                                textAnchor: "start",
                                transform: "translateY(4px)"
                            }}>
                            { value }
                        </text>
                    </g>
                ))}
            </g>
        )
    }
}

function BarChart() {
    const bars = dataset.map((d, i) =>
          <rect
            className="bar"
            x={xScale(d.x)}
            y={yScale(d.y)}
            height={chartHeight - padding - yScale(d.y)}
            width={xScale.bandwidth()}
          />
    );

    const xAxis = Axis("x");
    const yAxis = Axis("y");

    return (
        <svg width="150" height="150" viewBox="0 0 150 150">
            {xAxis}
            {yAxis}
            {bars}
        </svg>
    )
}

export default BarChart