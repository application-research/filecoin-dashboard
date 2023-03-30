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

export function RegionStackedBarChart({ graphData }: BarGraphProps) {
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

        <Bar
          dataKey="Asia.outgoing"
          stackId="outgoing"
          fill="var(--color-blue200)"
        />
        <Bar dataKey="Europe.outgoing" stackId="outgoing" fill="#FF7555" />
        <Bar
          dataKey="North America.outgoing"
          stackId="outgoing"
          fill="#F215A4"
        />
        <Bar dataKey="Oceania.outgoing" stackId="outgoing" fill="#8849A5" />
        <Bar
          dataKey="South America.outgoing"
          stackId="outgoing"
          fill="#C1D30C"
        />
        <Bar
          dataKey="Multiple Regions.outgoing"
          stackId="outgoing"
          fill="#59CEC5"
        />
        <Bar
          dataKey="Uncategorized.outgoing"
          stackId="outgoing"
          fill="var(--color-blue-purple)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
