import React from "react"
import analysisData from "../data/analysis_data.json"
import { scaleLinear, scaleBand } from "d3-scale"

const chartWidth = 300,
      chartHeight = 150,
      padding = {top: 40, bottom: 5, left: 35, right: 0};

const xScale = scaleBand()
    .domain(["Q1", "Q2", "Q3", "Q4", "Q5"])
    .rangeRound([padding.left + 1, chartWidth])
    .padding(0.2);

const yScale = scaleLinear()
    .domain([-12, 6])
    .range([chartHeight - padding.bottom, padding.top]);

const Axis = (direction, droppedOut, isPrint) => {
    if(direction === "x") {
        const xTicks = xScale.domain().map(value => ({
            value,
            xOffset: xScale(value) + xScale.bandwidth() / 2
        }));

        return (
            <g className="axis x">
                <text x={chartWidth / 2} y={15} fill={droppedOut && !isPrint ? `#BCBEC0` : `#000`} style={{textAnchor:`middle`, fontSize:14}}>Quintile</text>
             {/*   <path
                    d={[
                        "M", padding.left + 1, padding.top,
                        "H", chartWidth
                        ].join(" ")}
                    stroke={droppedOut && !isPrint ? `#BCBEC0` : `#000`}
                /> */}
                {xTicks.map(({value, xOffset}) => (
                    <text
                        key={value}
                        x={xOffset}
                        y={padding.top - 5}
                        fill={droppedOut && !isPrint ? `#BCBEC0` : `#000`}
                        style={{
                            fontSize: "12px",
                            textAnchor: "middle",
                        }}>
                        {value}
                    </text>
                ))}
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
                            stroke={(value === 0 && !droppedOut) || (value === 0 && isPrint) ? "#000" : "#d2d2d2"}
                        />
                        <text
                            key={value}
                            x={padding.left - 5}
                            y={0.5}
                            dy={`0.32em`}
                            fill={droppedOut && !isPrint ? `#BCBEC0` : `#000`}
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
    const bars = data.filter((d) => d.quintile !== "Top 1%" && d.quintile !== "All").map((d, i) =>
          <rect
            key={i}
            className="bar"
            x={xScale(d.quintile_short)}
            y={d.pct_change < 0 ? yScale(0) : yScale(d.pct_change)}
            height={Math.abs(yScale(d.pct_change) - yScale(0))}
            width={xScale.bandwidth()}
            style={{fill: props.droppedOut && !props.isPrint ? `#BCBEC0` : `#174a7c`}}
          />
    );

    const xAxis = Axis("x", props.droppedOut, props.isPrint);
    const yAxis = Axis("y", props.droppedOut, props.isPrint);

    return (
        <svg width={chartWidth} height={chartHeight} viewBox="0 0 300 150" style={{marginBottom:`1rem`}}>
            {yAxis}
            {xAxis}
            {bars}
        </svg>
    )
}

export default BarChart