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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="unitedStates" stackId="a" fill="#8884d8" />
        <Bar dataKey="asia" stackId="a" fill="blue" />
        <Bar dataKey="europe" stackId="a" fill="#82ca9d" />
        <Bar dataKey="unknown" stackId="a" fill="var(--color-blue-purple)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
