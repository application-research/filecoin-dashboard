import * as React from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

export interface BarGraphProps {
  graphData: any;
  showDesktopLedger: boolean;
  showMobileLedger: boolean;
}

export function IndustryChartTimeFilter({
  graphData,
  showMobileLedger,
  showDesktopLedger,
}: BarGraphProps) {
  const xAxisData = graphData.map((item) => item.date);

  var option = {
    tooltip: {},
    legend: {
      show: true,
      orient: "vertical",
      right: -20,
      top: 150,
      bottom: 0,
      data: [
        "IT & Technology Services",
        "Information, Media & Telecom.",
        "Environment",
        "Research",
        "Web3",
        "Life Science / Healthcare",
        "Financial Services",
        "Other",
      ],
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
        name: "IT & Technology Services",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["IT & Technology Services"]),
        itemStyle: { color: "#004477" },
      },
      {
        name: "Information, Media & Telecom.",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Information, Media & Telecom."]),
        itemStyle: { color: "#006341" },
      },
      {
        name: "Environment",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Environment"]),
        itemStyle: { color: "#1A8D66" },
      },
      {
        name: "Research",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Research"]),
        itemStyle: { color: "#147bc9" },
      },
      {
        name: "Web3",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Web3"]),
        itemStyle: { color: "#0090ff" },
      },
      {
        name: "Life Science / Healthcare",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Life Science / Healthcare"]),
        itemStyle: { color: "#66BCFF" },
      },
      {
        name: "Financial Services",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Financial Services"]),
        itemStyle: { color: "#96D1FF" },
      },
      {
        name: "Other",
        type: "bar",
        stack: "outgoing",
        data: graphData.map((item) => item["Other"]),
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
    <ReactEcharts
      option={option}
      echarts={echarts}
      style={{
        height: "500px",
        width: "100%",
        marginLeft: "-6rem",
        marginRight: "0.5rem",
      }}
    />
  );
}
