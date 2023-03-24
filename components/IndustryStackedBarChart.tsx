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

export function IndusrtyStackedBarChart({ graphData }: BarGraphProps) {
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

        <Bar dataKey="Education" stackId="a" fill="var(--color-blue200)" />
        <Bar dataKey="Life Science / Healthcare" stackId="a" fill="#FF7555" />
        <Bar dataKey="Environment" stackId="a" fill="#F215A4" />
        <Bar
          dataKey="Information, Media & Telecommunications"
          stackId="a"
          fill="#8849A5"
        />
        <Bar dataKey="IT & Technology Services" stackId="a" fill="#C1D30C" />
        <Bar dataKey="Web3" stackId="a" fill="red" />
        <Bar dataKey="Financial Services" stackId="a" fill="green" />

        <Bar dataKey="Other" stackId="a" fill="var(--color-blue-purple)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
