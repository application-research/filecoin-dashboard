import styles from "@components/IndustryStakedBarChart.module.scss";
import { BreakpointEnum, useBreakpoint } from "@root/common/use-breakpoint";

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
  showDesktopLedger: boolean;
  showMobileLedger: boolean;
}

export function IndustryStackedBarChart({
  graphData,
  showDesktopLedger,
  showMobileLedger,
}: BarGraphProps) {
  return (
    <ResponsiveContainer height={500}>
      <BarChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 4,
          right: showMobileLedger ? 10 : 0,
          left: showMobileLedger ? -20 : 2,
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
            value={showDesktopLedger ? "PiB Onboarded" : ""}
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />

        {showMobileLedger ? (
          <Legend
            className={styles.legendMobile}
            layout="horizontal"
            wrapperStyle={{ right: -20 }}
          />
        ) : (
          <></>
        )}

        {showDesktopLedger ? (
          <Legend
            className={styles.legendDesktop}
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ right: -20 }}
          />
        ) : (
          <></>
        )}

        <Bar dataKey="IT & Technology Services" stackId="a" fill="#004477" />
        <Bar
          dataKey="Information, Media & Telecom."
          stackId="a"
          fill="#006341"
        />
        <Bar dataKey="Environment" stackId="a" fill="#1A8D66" />
        <Bar dataKey="Research" stackId="a" fill="#147bc9" />

        <Bar dataKey="Web3" stackId="a" fill="var(--color-blue)" />

        <Bar dataKey="Life Science / Healthcare" stackId="a" fill="#66BCFF" />
        <Bar dataKey="Financial Services" stackId="a" fill="#96D1FF" />
        <Bar dataKey="Other" stackId="a" fill="#C2DEF3" />
      </BarChart>
    </ResponsiveContainer>
  );
}
