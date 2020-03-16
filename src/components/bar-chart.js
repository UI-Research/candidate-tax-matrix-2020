import React from "react"
import analysisData from "../data/analysis_data.json"
import { scaleLinear, scaleBand } from "d3-scale"
// import chartStyles from "./bar-chart.module.css"
const chartWidth = 300,
      chartHeight = 150,
      padding = {top: 20, bottom: 5, left: 35, right: 0};

const xScale = scaleBand()
    .domain(["Lowest", "Second", "Middle", "Fourth", "Highest"])
    .range([padding.left + 1, chartWidth])
    .padding(0.2);

const yScale = scaleLinear()
    .domain([-12, 0])
    .range([chartHeight - padding.bottom, padding.top]);

const Axis = (direction) => {
    if(direction === "x") {
        return (
            <g className="axis x">
                <text x={chartWidth / 2} y={padding.top - 8} fill="#000" style={{textAnchor:`middle`}}>Quintile</text>
                <path
                    d={[
                        "M", padding.left + 1, padding.top,
                        "H", chartWidth
                        ].join(" ")}
                    stroke="#000"
                />
            </g>
        )
    }
    else if(direction === "y") {
        const ticks = yScale.ticks(3).map(value => ({
                    value,
                    yOffset: yScale(value)
            }));

        return (
            <g className="axis y">
             {/*   <path
                    d={[
                        "M", padding.left + 1, padding.top,
                        "V", chartHeight - padding.bottom
                    ].join(" ")}
                    stroke="#000"
                />
            */}
                {ticks.map(({value, yOffset}) => (
                    <g key={value} transform={`translate(0, ${yOffset})`} className="tick">
                        <line
                            x1={padding.left}
                            x2={chartWidth}
                            stroke="#d2d2d2"
                        />
                        <text
                            key={value}
                            x={padding.left - 5}
                            y={0.5}
                            dy={`0.32em`}
                            style={{
                                fontSize: "12px",
                                textAnchor: "end",
                            }}>
                            { value }%
                        </text>
                    </g>
                ))}
            </g>
        )
    }
}

function BarChart(props) {
    console.log(yScale(0));
    const data = analysisData[props.candidate]["Graph data"];
    // data.filter((d) => d.quintile !== "Top 1%" && d.quintile !== "All").map((d) => console.log(xScale(d.quintile), yScale(d.pct_change)));
    const bars = data.filter((d) => d.quintile !== "Top 1%" && d.quintile !== "All").map((d, i) =>
          <rect
            key={i}
            className="bar"
            x={xScale(d.quintile)}
            y={padding.top}
            height={yScale(d.pct_change) - padding.top}
            width={xScale.bandwidth()}
            style={{fill:`#174a7c`}}
          />
    );

    const xAxis = Axis("x");
    const yAxis = Axis("y");

    return (
        <svg width={chartWidth} height={chartHeight} viewBox="0 0 300 150" style={{marginBottom:`1rem`}}>
            {yAxis}
            {xAxis}
            {bars}
        </svg>
    )
}

export default BarChart