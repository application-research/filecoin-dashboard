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

export function IndustryStackedBarChart({ graphData }: BarGraphProps) {
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
          dataKey="Information, Media & Telecommunications"
          stackId="a"
          fill="#004477"
        />
        <Bar dataKey="Education" stackId="a" fill="#004F8C" />

        <Bar dataKey="IT & Technology Services" stackId="a" fill="#006341" />

        <Bar dataKey="Environment" stackId="a" fill="#1A8D66" />

        <Bar dataKey="Web3" stackId="a" fill="var(--color-blue)" />

        <Bar dataKey="Life Science / Healthcare" stackId="a" fill="#66BCFF" />
        <Bar dataKey="Financial Services" stackId="a" fill="#C2DEF3" />
        <Bar dataKey="Other" stackId="a" fill="#CFCFCF" />
      </BarChart>
    </ResponsiveContainer>
  );
}
