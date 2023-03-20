import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    asia: 4000,
    unitedStates: 2400,
    europe: 2400,
    unknown: 300,
  },
  {
    name: "Week 1",
    asia: 3000,
    unitedStates: 1398,
    europe: 2210,
    unknown: 1230,
  },
  {
    name: "Week 2",
    asia: 2000,
    unitedStates: 9800,
    europe: 2290,
    unknown: 1000,
  },
  {
    name: "Week 3",
    asia: 2780,
    unitedStates: 3908,
    europe: 2000,
    unknown: 300,
  },
  {
    name: "Week 4",
    asia: 1890,
    unitedStates: 4800,
    europe: 2181,
    unknown: 750,
  },
];

export default function TimeSeries() {
  return (
    <ResponsiveContainer height={500}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
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
        <Line
          type="monotone"
          dataKey="asia"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="unitedStates" stroke="blue" />
        <Line type="monotone" dataKey="europe" stroke="orange" />
        <Line type="monotone" dataKey="unknown" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
