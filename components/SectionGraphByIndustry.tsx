import { groupClientsByWeekAndIndustry } from "@root/resolvers/client-industry";
import { IndustryStackedBarChart } from "./IndustryStackedBarChart";
import { AllData } from "@root/common/types";
import { useState } from "react";

interface SectionGraphByIndustryProps {
  allData: AllData[];
}

interface GraphByIndustryProps extends SectionGraphByIndustryProps {
  date: string;
}

export default function SectionGraphByIndustry({
  allData,
}: SectionGraphByIndustryProps) {
  if (!allData) return;
  const [selectedInterval, setSelectedInterval] = useState<
    "month" | "3months" | "6months" | "12months"
  >("month");

  const clientsArray = Array.from(allData);
  const handleIntervalChange = (event) => {
    return setSelectedInterval(event.target.value);
  };
  const groupedClients = groupClientsByWeekAndIndustry(
    clientsArray,
    selectedInterval
  );

  const sortedEightWeeks = groupedClients.sort(
    (a: GraphByIndustryProps, b: GraphByIndustryProps) => {
      const dateA = new Date(a.date.replace(",", ""));
      const dateB = new Date(b.date.replace(",", ""));
      return dateA.getTime() - dateB.getTime();
    }
  );
  // .slice(2)
  // .slice(-15);

  return (
    <>
      {" "}
      <div>
        Interval
        <select value={selectedInterval} onChange={handleIntervalChange}>
          <option value="month">month</option>
          <option value="3month">3 months</option>
          {/* <option value="6month">6 months</option>
          <option value="1month">1 year</option> */}
        </select>
        <IndustryStackedBarChart graphData={sortedEightWeeks} />
      </div>
    </>
  );
}
