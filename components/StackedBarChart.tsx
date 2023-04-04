"use client";

import * as React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BarGraphProps {
  graphData: any;
}

export function StackedBarChart({ graphData }: BarGraphProps) {
  return (
    <ResponsiveContainer height={500}>
      <BarChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis>
          <Label
            value="PiB Onboarded"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
        <Legend />

        {graphData?.map((data) => {
          <Bar
            dataKey={data.dataKey}
            stackId={data.stackId}
            fill={data.fill}
          />;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
