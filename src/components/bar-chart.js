import React from "react"
import analysisData from "../data/analysis_data.json"
import { scaleLinear, scaleBand } from "d3-scale"
// import chartStyles from "./bar-chart.module.css"
const chartWidth = 150,
      chartHeight = 150,
      padding = 20;

const xScale = scaleBand()
    .domain(["Lowest", "Second", "Middle", "Fourth", "Highest"])
    .range([padding, chartWidth])
    .padding(0);

const yScale = scaleLinear()
    .domain([-10, 0])
    .range([chartHeight - padding, 0]);

const Axis = (direction) => {
    if(direction === "x") {
        return (
            <g className="axis x">
                <path
                    d={[
                        "M", padding, 0,
                        "H", chartWidth
                        ].join(" ")}
                    stroke="#000"
                />
                <text x={chartWidth / 2} y={chartHeight} fill="#000">Quintile</text>
            </g>
        )
    }
    else if(direction === "y") {
        const ticks = yScale.ticks().map(value => ({
                    value,
                    yOffset: yScale(value)
            }));
// console.log(ticks);
        return (
            <g className="axis y">
                <path
                    d={[
                        "M", padding, 0,
                        "V", chartHeight - padding
                    ].join(" ")}
                    stroke="#000"
                />
          {/*      {ticks.map(({value, yOffset}) => (
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
                ))} */}
            </g>
        )
    }
}

function BarChart(props) {
    const data = analysisData[props.candidate]["Graph data"];
    // data.filter((d) => d.quintile !== "Top 1%" && d.quintile !== "All").map((d) => console.log(xScale(d.quintile), yScale(d.pct_change)));
    const bars = data.filter((d) => d.quintile !== "Top 1%" && d.quintile !== "All").map((d, i) =>
          <rect
            key={i}
            className="bar"
            x={xScale(d.quintile)}
            y={0}
            height={yScale(d.pct_change)}
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