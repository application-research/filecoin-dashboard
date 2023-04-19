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
          top: 4,
          right: 112,
          left: 2,
          bottom: 0,
        }}
      >
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="1000 1"
          stroke="var(--color-black300)"
        />

        <XAxis dataKey="date" stroke="var(--color-black300)" />
        <YAxis stroke="var(--color-black300)">
          <Label
            value="PiB Onboarded"
            fontFamily="Poppins"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />

        <p>test</p>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ right: 92 }}
        />

        <Bar dataKey="North America" stackId="outgoing" fill="#004477" />
        <Bar dataKey="South America" stackId="outgoing" fill="#006341" />
        <Bar dataKey="Multiple Regions" stackId="outgoing" fill="#1A8D66" />

        <Bar dataKey="Asia" stackId="outgoing" fill="#0090FF" />
        <Bar dataKey="Europe" stackId="outgoing" fill="#66BCFF" />
        <Bar dataKey="Oceania" stackId="outgoing" fill="#96D1FF" />
        <Bar dataKey="Uncategorized" stackId="outgoing" fill="#C2DEF3" />
      </BarChart>
    </ResponsiveContainer>
  );
}
