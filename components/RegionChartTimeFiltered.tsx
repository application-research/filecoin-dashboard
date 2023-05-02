import * as React from "react";
import ReactEcharts from "echarts-for-react";
import { ResponsiveContainer } from "recharts";

export interface BarGraphProps {
  graphData: any;
  showMobileLedger: boolean;
  showDesktopLedger: boolean;
}

export function RegionChartTimeFiltered({
  graphData,
  showMobileLedger,
  showDesktopLedger,
}: BarGraphProps) {
  const xAxisData = graphData.map((item) => item.date);

  var option = {
    tooltip: {},
    legend: {
      show: true,
      orient: showMobileLedger ? "horizontal" : "vertical",
      right: showMobileLedger ? 80 : 100,
      top: showMobileLedger ? 0 : 150,
      bottom: 0,
      data: [
        "North America",
        "South America",
        "Multiple Regions",
        "Asia",
        "Europe",
        "Oceania",
        "Uncategorized",
      ],
    },
    grid: {
      top: 10,
      right: 230,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLine: {
        show: true,
        lineStyle: {
          color: "var(--color-black300)",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        color: "var(--color-black500)",
        fontFamily: "Poppins",
        margin: 8,
      },
    },
    yAxis: {},
    series: [
      {
        name: "North America",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["North America"]),
        itemStyle: { color: "#004477" },
      },
      {
        name: "South America",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["South America"]),
        itemStyle: { color: "#006341" },
      },
      {
        name: "Multiple Regions",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Multiple Regions"]),
        itemStyle: { color: "#1A8D66" },
      },
      {
        name: "Asia",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Asia"]),
        itemStyle: { color: "#0090FF" },
      },
      {
        name: "Europe",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Europe"]),
        itemStyle: { color: "#66BCFF" },
      },
      {
        name: "Oceania",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Oceania"]),
        itemStyle: { color: "#96D1FF" },
      },
      {
        name: "Uncategorized",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Uncategorized"]),
        itemStyle: { color: "#C2DEF3" },
      },
    ],
    splitLine: {
      show: true,
    },

    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        filterMode: "empty",
      },
    ],
  };

  return (
    <ResponsiveContainer>
      <ReactEcharts
        option={option}
        style={{
          height: "500px",
          width: "110%",
          marginLeft: showMobileLedger ? "0rem" : "-7rem",
          marginRight: showMobileLedger ? "0rem" : "0rem",
        }}
      />
    </ResponsiveContainer>
  );
}
