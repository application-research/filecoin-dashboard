"use client";
import styles from "@components/BarGraph.module.scss";

import * as React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BarGraphProps {
  graphData: any;
}

export function MixBarChart({ graphData }: BarGraphProps) {
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Asia" stackId="a" fill="var(--color-blue200)" />
        <Bar dataKey="Europe" stackId="a" fill="#FF7555" />
        <Bar dataKey="NorthAmerica" stackId="a" fill="#F215A4" />
        <Bar dataKey="Oceania" stackId="a" fill="#8849A5" />
        <Bar dataKey="SouthAmerica" stackId="a" fill="#C1D30C" />
        <Bar
          dataKey="Uncategorized"
          stackId="a"
          fill="var(--color-blue-purple)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
