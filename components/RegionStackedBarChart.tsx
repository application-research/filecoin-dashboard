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
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
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
        <Bar dataKey="North America" stackId="outgoing" fill="#004477" />
        <Bar dataKey="Asia" stackId="outgoing" fill="#0090FF" />
        <Bar dataKey="Europe" stackId="outgoing" fill="#66BCFF" />
        <Bar dataKey="Oceania" stackId="outgoing" fill="#C2DEF3" />
        <Bar dataKey="South America" stackId="outgoing" fill="#006341" />
        <Bar dataKey="Multiple Regions" stackId="outgoing" fill="#1A8D66" />
        <Bar dataKey="Uncategorized" stackId="outgoing" fill="#C2DEF3" />
      </BarChart>
    </ResponsiveContainer>
  );
}
